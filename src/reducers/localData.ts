interface User {
  uid: string;
  username: string;
}
interface LocalData {
  currentPage: string;
  user?: User;
}
const initialState: LocalData = {
  currentPage: "Dashboard",
};

export default (state = initialState, action: any): LocalData => {
  switch (action.type) {
    case "updateUser":
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};
