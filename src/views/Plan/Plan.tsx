import React from 'react'
import TopNav from "./../../Components/TopNav/TopNav"

import FullCalendar from "@fullcalendar/react"
import timeGridPlugin from "@fullcalendar/timegrid"
import { Container } from 'semantic-ui-react'
import { useFirestoreConnect } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { RootState } from '../../reducers/store'

const Plan = () => {
  const user = useSelector((state:RootState)=>state.localData.user)
  if (user!=undefined){
    useFirestoreConnect([{collection:"users",doc:user.uid}])
    const events = useSelector((state:RootState)=>state.firestore.(user.uid).events)
  }
  return (
    <div>
      <TopNav />
      <Container>
        <FullCalendar 
          // style={{height:"80vh",width:"80vw"}}
          plugins={[timeGridPlugin]}
          initialView="timeGridWeek"
          events = {[{title:"pizza",start:"2020-08-28T10:35",end:"2020-08-28T11:00"}]}


        />
      </Container>

      
    </div>
  )
}
export default Plan