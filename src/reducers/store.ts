import { combineReducers, createStore } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import localData from "./localData";

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  localData: localData,
});
// export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;
