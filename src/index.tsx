import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import "semantic-ui-css/semantic.min.css";

import firebase from "firebase"

import rootReducer from "./reducers/store";
import "./index.css";
import App from "./App";



const store = createStore(rootReducer);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
