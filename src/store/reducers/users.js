import { SET_CURRENT_USER } from "../actionTypes";

const defaultState = {
   isAuthenticated: false,
   currentUser: {}
};

const reducer = (state = defaultState, action) => {
   switch (action.type) {
      case SET_CURRENT_USER:
         return {
            isAuthenticated: !!Object.keys(action.user).length,
            currentUser: action.user
         };
      default:
         return state;
   }
};

export default reducer;