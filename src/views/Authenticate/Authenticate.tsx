import React, { useState } from "react";

import { useFirebase } from "react-redux-firebase";
import * as firebase from "firebase/app";
import "firebase/auth";
import { useHistory, Link } from "react-router-dom";

import MiniLogo from "../../Components/Logos/MiniLogo";
import rectangleLogo from "../../assets/rectangleLogo.png";
import FullLogo from "../../Components/Logos/FullLogo";

// CSS
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

const Authenticate = () => {
  const history = useHistory();
  let db = firebase.firestore();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: false,
    password: false,
    message: "",
  });
  const addUserToFirestore = (user: any) => {
    db.collection("users").doc(user.uid).set(user);
  };

  const login = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(userInfo.email, userInfo.password)
      .then((result) => {
        if (result.user != null) {
          // db.collection("users").doc(result.user.uid).set({
          //   username: "Koala",
          //   email: result.user.email,
          // });
        }
        history.push("/dashboard");
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        alert(errorMessage);
      });
  };

  const googleLogIn = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result)
        if (result.user !== null){
          if (result.operationType !== "signIn"){
            addUserToFirestore({
              uid: result.user.uid,
              username: "Gmail Koala",
              email: result.user.email,
            });
          }
          history.push("/dashboard");
        }
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode, errorMessage);
        let email = error.email;
        let credential = error.credential;
      });
  };

  const guestLogIn = () => {
    firebase
      .auth()
      .signInAnonymously()
      .then((result) => {
        if (result.user != null) {
          console.log(result.user);
          addUserToFirestore({
            uid: result.user.uid,
            username: "Anonymous Koala",
            email: result.user.email,
          });

          history.push("/dashboard");
        }
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
      });
  };

  const signUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(userInfo.email, userInfo.password)
      .then((result) => {
        if (result.user != null) {
          addUserToFirestore({
            uid: result.user.uid,
            username: "Koala",
            email: result.user.email,
          });
        }
        history.push("/dashboard");
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        setError({ email: true, password: true, message: errorMessage });
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
          <Grid.Row style={{ marginBottom: "20px" }}>
            <FullLogo />
          </Grid.Row>
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
                error={error.email}
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
                error={error.password}
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
                Login/SignUp with Google
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
          {error.message === "" ? (
            <div></div>
          ) : (
            <Message
              error
              header="SignUp/Login Error"
              content={error.message}
            />
          )}

          <Button fluid style={{ marginTop: "15px" }} basic onClick={signUp}>
            <h5>Sign Up</h5>
          </Button>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Authenticate;
