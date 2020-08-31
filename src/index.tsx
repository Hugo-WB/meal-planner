import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import "semantic-ui-css/semantic.min.css";

import firebase from "./firebase";
import "firebase/firestore";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";

import rootReducer from "./reducers/store";
import "./index.css";
import App from "./App";

const rrfConfig = {
  userProfile: "user",
};

const initialState = {};
const store = createStore(rootReducer, initialState);
const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <App />
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);



// TODO: Make the Plan, use fullcalendar.io   
// TODO: prices
//TODO: Get name from authentification
//TODO: ADD recipes using web scraping python maybe? or JS
//TODO do something with ML estimate price of recipe using ML
