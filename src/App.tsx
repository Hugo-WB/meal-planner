import React, { Component } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from "react-router-dom";

import Homepage from "./views/Homepage/Homepage";
import Recipes from "./views/Recipes/Recipes";
import Plan from "./views/Plan/Plan";
import Authenticate from "./views/Authenticate/Authenticate";
import "./App.css";

import * as firebase from "firebase/app";
import "firebase/auth";
import { RootState } from "./reducers/store";
import { useFirestoreConnect } from "react-redux-firebase";
import TopNav from "./Components/TopNav/TopNav";

interface route {
  path: string;
  component: any;
}

const App = () => {
  // PRE LOAD DATA:
  useFirestoreConnect({collection:"recipes",where:["meal","==","breakfast"],storeAs:"breakfastRecipes"})
  useFirestoreConnect({collection:"recipes",where:["meal","==","lunch"],storeAs:"lunchRecipes"})
  useFirestoreConnect({collection:"recipes",where:["meal","==","dinner"],storeAs:"dinnerRecipes"})
  useFirestoreConnect({ collection: "recipes"});


  let db = firebase.firestore();
  const dispatch = useDispatch();

  const loggedIn = useSelector((state:RootState)=>state.localData.loggedIn)
  // Updated local redux store depending on whether the user is logged in or not
  firebase.auth().onAuthStateChanged((user) => {
    if (user != null) {
      dispatch({
        type: "loginUser",
        user: { uid: user.uid, username: "test" },
      });
    }else{
      dispatch({
        type:"logoutUser",
      })
    }
  });

  // React Router routes shown when not logged in
  const unsecureRoutes:route[]=[
    {
      path: "/authenticate",
      component: Authenticate,
    },
    {
      path:"*",
      component:Homepage,
    }
  ]
    
  const unsecureRoutesJSX = (
    unsecureRoutes.map((route) => (
      <Route path={route.path} component={route.component} exact={true} />
    ))

  )
  // React Router routes when logged in
  const secureRoutes: route[] = [
    {
      path: "/recipes",
      component: Recipes,
    },
    {
      path: "/plan",
      component: Plan,
    },
  ];
  const secureRoutesJSX = (
    secureRoutes.map((route) => (
      <Route path={route.path} component={route.component} exact={true} />
    ))
  )

  return (
    <div>
      <Router>
        <Switch>
          {loggedIn ? secureRoutesJSX:""}
          {unsecureRoutesJSX}
        </Switch>
      </Router>
    </div>
  );
};

export default connect()(App);
