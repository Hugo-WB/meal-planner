import React, { useState, useEffect } from "react";
import { useFirestoreConnect, useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// CSS:
import { Container, Form, Button, Segment, Grid } from "semantic-ui-react";

// Components:
import TopNav from "./../../Components/TopNav/TopNav";

// EXTERNAL COMPONENTS:
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

// TYPES/INTERFACES:
import { RootState } from "../../reducers/store";
import { PlanFormInputs, Events, FormattedEvents } from "./../../types";

const Plan = () => {
  const firestore = useFirestore();
  const history = useHistory();

  const [events, setEvents] = useState<Events>([]);
  const [formInputs, setFormInputs] = useState<PlanFormInputs>({
    breakfast: false,
    lunch: true,
    dinner: true,
  });
  const localUserUID = useSelector(
    (state: RootState) => state.localData.user.uid
  );
  useFirestoreConnect([{ collection: "users", doc: localUserUID }]);
  const user = useSelector((state: RootState) => state.firestore.ordered.users);

  useEffect(() => {
    try {
      let tempEvents = user[0].events;
      if (tempEvents !== undefined && events.length < 1) {
        setEvents(tempEvents);
      }
    } catch (error) {}
  }, [user, events.length]);

  const generateEvents = (): Events => {
    let events: Events = [];
    let mealTimes: [number, number][][] = [
      [
        [8, 0],
        [9, 0],
      ],
      [
        [12, 0],
        [13, 0],
      ],
      [
        [19, 0],
        [20, 0],
      ],
    ];
    for (let day = 0; day < 7; day++) {
      let meals: Events = [];
      for (let meal = 0; meal < 3; meal++) {
        meals.push({
          title: "test",
          start: mealTimes[meal][0],
          end: mealTimes[meal][1],
          weekDay: day,
        });
      }
      events = events.concat(meals);
    }
    // console.log("generated");
    // console.log(events);

    if (localUserUID !== undefined) {
      firestore
        .collection("users")
        .doc(localUserUID)
        .update({
          events: events,
        })
        .then(() => {
          console.log("successfull, added events to firestore");
          setEvents(events);
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      alert("please login");
      history.push("/");
    }
    return events;
  };

  const getFormattedEvents = (unformatted: Events): FormattedEvents => {
    let output: any[] = [];
    let now = new Date();
    let dayOfWeek = (now.getDay() + 6) % 7;

    for (let event = 0; event < unformatted.length; event++) {
      let dayDate = new Date();
      dayDate.setDate(now.getDate() - dayOfWeek + unformatted[event].weekDay);
      let startTime = new Date(
        dayDate.setHours(
          unformatted[event].start[0],
          unformatted[event].start[1],
          0,
          0
        )
      );
      let endTime = new Date(
        dayDate.setHours(
          unformatted[event].end[0],
          unformatted[event].end[1],
          0,
          0
        )
      );
      let formattedEvent = {
        title: unformatted[event].title,
        start: startTime.toISOString(),
        end: endTime.toISOString(),
      };

      output = output.concat(formattedEvent);
    }
    // console.log(output);
    return output;
  };

  const form = (
    <Grid textAlign="center" verticalAlign="middle">
      <Grid.Column style={{ marginTop: "30px", maxWidth: "600px" }}>
        <Segment stacked>
          <Form>
            <Form.Group inline widths="equal">
              <label>Meals</label>
              {/* <Form.Radio label="breakfast" value="breakfast" checked={formInputs.breakfast===true} onChange={(e)=>console.log(target)}/> */}
            </Form.Group>
            <Button color="teal" onClick={generateEvents}>
              Generate
            </Button>
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
  const calendar = (
    <Container style={{ marginTop: "20px", height: "90vh" }}>
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        events={getFormattedEvents(events)}
        firstDay={1}
        height={"100%"}
        eventClick={(click) => console.log(click)}
      />
      {form}
    </Container>
  );

  return (
    <div>
      <TopNav />
      {events.length < 1 ? form : calendar}
    </div>
  );
};
export default Plan;
