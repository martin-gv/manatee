import { SET_CURRENT_USER, LOAD_USERS } from "../actionTypes";

const defaultState = {
   isAuthenticated: false,
   currentUser: {},
   users: []
};

const setCurrentUser = (state, action) => {
   return {
      ...state,
      isAuthenticated: !!Object.keys(action.user).length,
      currentUser: action.user
   };
};

const loadUsers = (state, action) => {
   return { ...state, users: action.data };
};

const reducer = (state = defaultState, action) => {
   switch (action.type) {
      case SET_CURRENT_USER:
         return setCurrentUser(state, action);
      case LOAD_USERS:
         return loadUsers(state, action);
      default:
         return state;
   }
};

export default reducer;
