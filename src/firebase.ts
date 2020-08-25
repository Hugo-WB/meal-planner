import firebase from "firebase/app";
import "firebase/firestore";
const config = {
  apiKey: "AIzaSyDWK00mcybySnW_JgfsBCqZbeTPkUP4DEY",
  authDomain: "meal-planner-92a60.firebaseapp.com",
  databaseURL: "https://meal-planner-92a60.firebaseio.com",
  projectId: "meal-planner-92a60",
  storageBucket: "meal-planner-92a60.appspot.com",
  messagingSenderId: "107484953566",
  appId: "1:107484953566:web:22b2bb7186c4d98d3d7b4f",
  measurementId: "G-CK0YC286NN",
};
firebase.initializeApp(config);
firebase.firestore();
export default firebase;
