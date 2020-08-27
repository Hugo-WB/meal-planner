import React, { Component } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Homepage from "./views/Homepage/Homepage";
import Dashboard from "./views/Dashboard/Dashboard";
import Recipes from "./views/Recipes/Recipes";
import Plan from "./views/Plan/Plan";
import Authenticate from "./views/Authenticate/Authenticate";
import "./App.css";

import * as firebase from "firebase/app";
import "firebase/auth";

interface route {
  path: string;
  component: any;
}

const App = () => {
  const routes: route[] = [
    {
      path: "/dashboard",
      component: Dashboard,
    },
    {
      path: "/recipes",
      component: Recipes,
    },
    {
      path: "/plan",
      component: Plan,
    },
    {
      path: "/authenticate",
      component: Authenticate,
    },
  ];
  let db = firebase.firestore();
  const dispatch = useDispatch();

  firebase.auth().onAuthStateChanged((user) => {
    if (user != null) {
      dispatch({
        type: "updateUser",
        user: { uid: user.uid, username: "test" },
      });
    }
  });

  return (
    <div>
      <Router>
        <Switch>
          {routes.map((route) => (
            <Route path={route.path} component={route.component} exact={true} />
          ))}
          <Route path="*" component={Homepage}></Route>
        </Switch>
      </Router>
    </div>
  );
};

export default connect()(App);
