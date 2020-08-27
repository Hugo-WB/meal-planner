import { combineReducers, createStore } from "redux";
import { firebaseReducer, FirebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import localData from "./localData";

// export interface Recipe {
//   name:string,
//   id?:string,
//   description:string,
//   imageSrc:string,
//   owner?:any, // <-- Fix this to whatever
//   ingredients:string[],
//   takeAway?:boolean,
//   steps:string,
// }

// interface user{
//   name:string,
//   id:string,
//   username?:string,
//   password?:string,
// }

// interface Schema {
//   recipes: Recipe,
//   users: user,
// }

// interface RootState {
//   firebase: FirebaseReducer.Reducer,
//   firestore:any,
//   localData:any,
// }

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  localData: localData,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
