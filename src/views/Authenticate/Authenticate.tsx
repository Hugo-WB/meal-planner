import React, { useState } from "react";

import { Grid, Container, Form, Segment, Button,Header,Image, Icon } from "semantic-ui-react";
import { useFirebase } from "react-redux-firebase";
import * as firebase from "firebase/app"
import "firebase/auth"

const Authenticate = () => {
  // const firebase = useFirebase()
  const [userInfo,setUserInfo] = useState({
    email:"",
    password:"",
  })
  const login = () =>{
    firebase.auth().createUserWithEmailAndPassword(userInfo.email,userInfo.password).catch((error)=>{
      let errorCode = error.code
      let errorMessage = error.message
      alert(errorMessage)
    })
  }
  return (
    <div>
      <Grid textAlign="center" verticalAlign="middle" centered style={{height:"100vh",backgroundColor:"205, 214, 221"}}>
        <Grid.Column style={{maxWidth:"500px"}}>
          <Header textAlign="center" color="teal" size="huge" dividing style={{paddingBottom:"20px"}}>
            <Icon name="food" size="huge" />
            Meal Planner
          </Header>
          <Form size="large">
            <Segment>
              <Form.Input fluid icon="user" iconPosition="left" placeholder="email" value={userInfo.email} onChange = {(e)=>{setUserInfo({...userInfo,email:e.target.value})}}/>
              <Form.Input fluid icon="lock" type="password" placeholder="Password" iconPosition="left" value={userInfo.password} onChange = {(e)=>{setUserInfo({...userInfo,password:e.target.value})}}/>
              <Button fluid color="teal" onClick = {login}>Sign In</Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Authenticate;
