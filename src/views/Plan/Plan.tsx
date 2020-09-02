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
import {
  UnformattedEvents,
  FormattedEvents,
  FormattedEvent,
} from "./../../types";

const Plan = () => {
  const firestore = useFirestore();
  const history = useHistory();

  const [events, setEvents] = useState<UnformattedEvents>([["test","test","test"],["test","test","test"],["test","test","test"],["test","test","test"],["test","test","test"],["test","test","test"],["test","test","test"]]);
  const localUserUID = useSelector(
    (state: RootState) => state.localData.user.uid
  );
  useFirestoreConnect([{ collection: "users", doc: localUserUID }]);
  const user = useSelector((state: RootState) => state.firestore.ordered.users);

  useEffect(() => {
    try {
      console.log("Users", user);
      let tempEvents = user[0].events;
      console.log("tempevents", tempEvents);
      if (tempEvents !== undefined && events.length < 1) {
        setEvents(tempEvents);
      }
    } catch (error) {}
  });

  const generateEvents = ():UnformattedEvents => {
    console.log("generating events");
    let unformattedEvents:UnformattedEvents = []

    for (let day = 0; day < 7; day++) {
      let meals:string[] = []
      for (let meal=0; meal<3;meal++) {
        meals.push("test")
      }
      console.log(meals)
      unformattedEvents.push([ meals ])
    }
    console.log("generated")
    console.log(unformattedEvents)
    
    // if (localUserUID !== undefined) {
    //   console.log("firestore", events);
    //   firestore
    //     .collection("users")
    //     .doc(localUserUID)
    //     .update({
    //       events: unformattedEvents,
    //     })
    //     .then(() => {
    //       console.log("successfull, added events to firestore");
    //     })
    //     .catch((error) => {
    //       alert(error.message);
    //     });
    //   } else {
    //     alert("please login");
    //     history.push("/");
    //   }
    setEvents(unformattedEvents);
    return unformattedEvents
  };

  const getFormattedEvents = (unformatted: UnformattedEvents):FormattedEvents => {
    console.log("UNFORMATTED INPUT")
    console.log(unformatted)
    let mealTimes = [[8,9],[12,13],[19,20]]
    let output:any[] = []
    let now = new Date()
    let dayOfWeek = ( ( now.getDay() +6 ) % 7 )
    for (let day = 0; day < 7; day++) {
      let dayDate = new Date()
      dayDate.setDate(now.getDate()-dayOfWeek+day)
      let breakfast = [ new Date(dayDate.setHours(mealTimes[0][0],0,0,0)), new Date(dayDate.setHours(mealTimes[0][1],0,0,0))]
      let lunch = [ new Date(dayDate.setHours(mealTimes[1][0],0,0,0)), new Date(dayDate.setHours(mealTimes[1][1],0,0,0))]
      let dinner = [ new Date(dayDate.setHours(mealTimes[2][0],0,0,0)), new Date(dayDate.setHours(mealTimes[2][1],0,0,0))]

      
      let meals = [
        {
        title:unformatted[day][0],
        start:breakfast[0].toISOString(),
        end:breakfast[1].toISOString(),
        },
        {
        title:unformatted[day][1],
        start:lunch[0].toISOString(),
        end:lunch[1].toISOString(),
        },
        {
        title:unformatted[day][0],
        start:dinner[0].toISOString(),
        end:dinner[1].toISOString(),
        },
      ]

      output = output.concat(meals)
    }
    console.log(output)
    return output;
  };
  
  const form = (
    <Grid textAlign="center" verticalAlign="middle">
      <Grid.Column style={{ marginTop: "30px", maxWidth: "600px" }}>
        <Segment stacked>
          <Form>
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
        height={"100%"}
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
