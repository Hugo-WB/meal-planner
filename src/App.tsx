import React, { Component } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from "react-router-dom";

import Homepage from "./views/Homepage/Homepage";
import Dashboard from "./views/Dashboard/Dashboard";
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
  let db = firebase.firestore();
  const dispatch = useDispatch();

  const loggedIn = useSelector((state:RootState)=>state.localData.loggedIn)

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

  const unsecureRoutesJSX = (
    unsecureRoutes.map((route) => (
      <Route path={route.path} component={route.component} exact={true} />
    ))

  )
  const secureRoutes: route[] = [
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

// const SecureRoutes = () =>{
//   // let {path,url} = useRouteMatch()
//   const secureRoutes: route[] = [
//     {
//       path: "/dashboard",
//       component: Dashboard,
//     },
//     {
//       path: "/recipes",
//       component: Recipes,
//     },
//     {
//       path: "/plan",
//       component: Plan,
//     },
//   ];
//   const secureRoutesJSX = (
//     secureRoutes.map((route) => (
//       <Route path={route.path} component={route.component} exact={true} />
//     ))
//   )
//   return (
//     <div>
//       {secureRoutesJSX}

//     </div>
//   )

// }

export default connect()(App);
