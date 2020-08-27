import React, { useState } from "react";

import {
  Grid,
  Container,
  Form,
  Segment,
  Button,
  Header,
  Image,
  Icon,
  Message,
  Modal,
} from "semantic-ui-react";
import { useFirebase } from "react-redux-firebase";
import * as firebase from "firebase/app";
import "firebase/auth";
import { useHistory, Link } from "react-router-dom";

const Authenticate = () => {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [signUp, setSignUp] = useState(false);

  const login = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(userInfo.email, userInfo.password)
      .then(() => {
        history.push("/dashboard");
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        alert(errorMessage);
      });
  };

  const googleLogIn = () => {
    console.log("work in progress");
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        // if (result.credential.accessToken){
        //   let token = result.credential.accessToken
        //   let user = result.user
        // }
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        let email = error.email;
        let credential = error.credential;
      });
  };

  const guestLogIn = () => {
    console.log("guest login");
    firebase
      .auth()
      .signInAnonymously()
      .then(() => {
        history.push("/dashboard");
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
      });
  };

  return (
    <div>
      <Grid
        textAlign="center"
        verticalAlign="middle"
        style={{ height: "100vh", backgroundColor: "205, 214, 221" }}
      >
        <Grid.Column style={{ maxWidth: "500px" }}>
          <Header
            textAlign="center"
            color="orange"
            size="huge"
            dividing
            style={{ paddingBottom: "20px" }}
          >
            <Icon name="food" size="huge" />
            Meal Planner
          </Header>
          <Form size="large">
            <Segment piled>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="email"
                value={userInfo.email}
                onChange={(e) => {
                  setUserInfo({ ...userInfo, email: e.target.value });
                }}
              />
              <Form.Input
                fluid
                icon="lock"
                type="password"
                placeholder="Password"
                iconPosition="left"
                value={userInfo.password}
                onChange={(e) => {
                  setUserInfo({ ...userInfo, password: e.target.value });
                }}
              />
              <Button
                fluid
                color="orange"
                onClick={login}
                style={{ marginBottom: "5px" }}
              >
                Sign In
              </Button>
              <Button
                fluid
                color="blue"
                onClick={googleLogIn}
                icon
                labelPosition="left"
                style={{ marginBottom: "5px" }}
              >
                <Icon name="google" />
                Login with Google
              </Button>
              <Button
                fluid
                color="grey"
                onClick={guestLogIn}
                icon
                labelPosition="left"
              >
                <Icon name="user secret" />
                Login as a Guest
              </Button>
            </Segment>
          </Form>

          <Message textAlign="center">
            New? <Link to="/signup">Sign Up</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Authenticate;
