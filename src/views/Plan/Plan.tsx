import React, { useState } from "react";
import TopNav from "./../../Components/TopNav/TopNav";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Container, Form, Button, Segment, Grid } from "semantic-ui-react";

import { useFirestoreConnect, useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
// import * as firebase from "firebase"
// import "firebase/firestore"

import { RootState } from "../../reducers/store";
import { useHistory } from "react-router-dom";

interface Event {
  title: string;
  start: string;
  end: string;
}
const Plan = () => {
  const firestore = useFirestore();
  const history = useHistory();

  const [events, setEvents] = useState<Event[]>([]);
  const localUserUID = useSelector(
    (state: RootState) => state.localData.user.uid
  );
  useFirestoreConnect([{ collection: "users" }]);
  const users = useSelector((state: RootState) => state.firestore.data.users);

  try {
    let tempEvents = users[localUserUID].events;
    if (tempEvents !== undefined && events.length < 1) {
      setEvents(tempEvents);
    }
  } catch (error) {
    console.log(error);
  }

  const generateEvents = () => {
    console.log("generating events");
    const newEvents = [
      {
        title: "test",
        start: "2020-08-28T17:21",
        end: "2020-08-28T16:00",
      },
    ];

    if (localUserUID !== undefined) {
      console.log("firestore", events);
      firestore
        .collection("users")
        .doc(localUserUID)
        .update({
          events: newEvents,
        })
        .then(() => {
          console.log("successfull, added events to firestore");
          setEvents(newEvents);
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      alert("please login");
      history.push("/");
    }
  };

  const calendar = (
    <Container style={{ marginTop: "20px", height: "90vh" }}>
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        events={events}
        height={"100%"}
      />
    </Container>
  );

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

  return (
    <div>
      <TopNav />
      {events.length < 1 ? form : calendar}
    </div>
  );
};
export default Plan;
