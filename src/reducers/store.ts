import { combineReducers, createStore } from "redux";
import {firebaseReducer} from "react-redux-firebase"
import localData from "./localData" 

const rootReducer = combineReducers({
  firebase:firebaseReducer,
  localData:localData,
});
// export type RootState = ReturnType<typeof rootReducer>
export default rootReducer