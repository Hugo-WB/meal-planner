import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Homepage from "./views/Homepage/Homepage";
import Dashboard from "./views/Dashboard/Dashboard";
import Recipes from "./views/Recipes/Recipes";
import Plan from "./views/Plan/Plan";
import Authenticate from "./views/Authenticate/Authenticate"
import "./App.css";

export class App extends Component {
  routes = [
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
      path:"/authenticate",
      component:Authenticate,
    }
  ];

  render() {
    return (
      <div>
        <Router>
          <Switch>
            {this.routes.map((route) => (
              <Route
                path={route.path}
                component={route.component}
                exact={true}
              />
            ))}
            <Route path="*" component={Homepage}></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
