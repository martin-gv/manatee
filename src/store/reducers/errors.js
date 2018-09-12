import { ADD_ERROR, REMOVE_ERROR } from "../actionTypes";

const addError = (state, action) => {
   return { ...state, message: action.error };
};

const removeError = (state, action) => {
   return { ...state, message: null };
};

const reducer = (state = { message: null }, action) => {
   switch (action.type) {
      case ADD_ERROR:
         return addError(state, action);
      case REMOVE_ERROR:
         return removeError(state, action);
      default:
         return state;
   }
};

export default reducer;