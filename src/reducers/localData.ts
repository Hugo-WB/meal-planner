interface User {
  uid: string;
  username: string;
}
interface LocalData {
  currentPage: string;
  loggedIn:boolean;
  user: User;
}
const initialState: LocalData = {
  currentPage: "Dashboard",
  loggedIn:true,
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