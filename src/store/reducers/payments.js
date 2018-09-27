import { LOAD_PAYMENTS, ADD_NEW_PAYMENT, EDIT_PAYMENT } from "../actionTypes";
import { editStore } from "../../utility/utility";

const defaultState = [];

const loadPayments = (state, action) => {
   return [...action.data];
};

const addNewPayment = (state, action) => {
   return [...state, action.obj];
};

const editPayment = (state, action) => {
   console.log("action", action);
   return editStore(state, action, "paymentID");
};

// const removeRow = (state, action) => {
//    return state.filter(el => el._id !== action.id);
// };

// const textInputChange = (state, action) => {
//    const index = state.findIndex(el => el._id === action.id);
//    const newState = [...state];
//    newState[index] = {
//       ...state[index],
//       [action.field]: action.value
//    };
//    return newState;
// };

const reducer = (state = defaultState, action) => {
   switch (action.type) {
      case LOAD_PAYMENTS:
         return loadPayments(state, action);
      case ADD_NEW_PAYMENT:
         return addNewPayment(state, action);
      case EDIT_PAYMENT:
         return editPayment(state, action);
      default:
         return state;
   }
};

export default reducer;
