import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import "semantic-ui-css/semantic.min.css";

import firebase from "firebase/app"
import "firebase/firestore"
import {ReactReduxFirebaseProvider} from "react-redux-firebase"
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore'

import rootReducer from "./reducers/store";
import "./index.css";
import App from "./App";

const fbConfig = {
  apiKey: "AIzaSyDWK00mcybySnW_JgfsBCqZbeTPkUP4DEY",
  authDomain: "meal-planner-92a60.firebaseapp.com",
  databaseURL: "https://meal-planner-92a60.firebaseio.com",
  projectId: "meal-planner-92a60",
  storageBucket: "meal-planner-92a60.appspot.com",
  messagingSenderId: "107484953566",
  appId: "1:107484953566:web:22b2bb7186c4d98d3d7b4f",
  measurementId: "G-CK0YC286NN"
}

//react-redux-firebase config
const rrfConfig = {
  userProfile:"users",
}
firebase.initializeApp(fbConfig)
firebase.firestore()
const store = createStore(rootReducer);
const rrfProps = {
  firebase,
  config:rrfConfig,
  dispatch:store.dispatch,
}

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
