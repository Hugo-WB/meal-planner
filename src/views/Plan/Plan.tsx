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
  const localUserUID = useSelector((state: RootState) => state.localData.user.uid);
  useFirestoreConnect([{ collection: "users" }]);
  const users = useSelector((state: RootState) => state.firestore.data.users);
  // if ((localUserUID.length>1) && (users[localUserUID].events !== undefined) && (events.length<1)){
  //   setEvents(users[localUserUID].events);
  // }
  const generateEvents = () => {
    console.log("generating events")
    setEvents([
      {
        title: "test",
        start: "2020-08-28T17:21",
        end: "2020-08-28T16:00",
      },
    ]);
    if (localUserUID !== undefined) {
      firestore.collection("users").doc(localUserUID).update({
        events:events
      }).then(()=>{
        console.log("successfull, added events to firestore")
        setEvents(events)
      }).catch((error)=>{alert(error.message)});
    } else {
      alert("please login");
      history.push("/");
    }
  };

  const calendar = (
    <Container style={{ marginTop: "20px" }}>
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        events={events}
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
