import React, { useState } from 'react'
import TopNav from "./../../Components/TopNav/TopNav"

import FullCalendar from "@fullcalendar/react"
import timeGridPlugin from "@fullcalendar/timegrid"
import { Container, Form, Button, Segment, Grid } from 'semantic-ui-react'

import { useFirestoreConnect } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import * as firebase from "firebase"
import "firebase/firestore"

import { RootState } from '../../reducers/store'


const Plan = () => {
  const db = firebase.firestore()
  const localUser = useSelector((state:RootState)=>state.localData.user)
  useFirestoreConnect([{collection:"users"}])
  const users = useSelector((state:RootState)=>state.firestore.data.users)
  const [events,setEvents] = useState([])
  if((users!==undefined)&& (localUser!==undefined)){
    if (users[localUser.uid].events !== undefined){
      setEvents(users[localUser.uid].events)
    }
  }

  const generateEvents = () =>{

  }


  const calendar = (
    <Container style={{marginTop:"20px"}}>
      <FullCalendar 
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        events = {events}
      />
    </Container>
  )

  const form = (
    <Grid textAlign="center" verticalAlign="middle">
      <Grid.Column style={{marginTop:"30px",maxWidth:"600px"}}>
      <Segment stacked>
        <Form>
          <Button color="teal" onClick={generateEvents}>Generate</Button>
        </Form>
      </Segment>
      </Grid.Column>
    </Grid>
  )

  return (
    <div>
      <TopNav />
      {(events.length<1)?form:calendar}

      
    </div>
  )
}
export default Plan