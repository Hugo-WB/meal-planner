import {LocalData} from "../types"
const initialState: LocalData = {
  currentPage: "Dashboard",
  loggedIn:false,
  user:{
    uid:"",
    username:"",
  }
};

export default (state = initialState, action: any): LocalData => {
  switch (action.type) {
    case "loginUser":
      return {
        ...state,
        loggedIn:true,
        user: action.user,
      };
    case "logoutUser":
      return{
        ...state,
        loggedIn:false,
        user:initialState.user,
      }
    default:
      return state;
  }
};
