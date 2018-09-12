import {
   LOAD_ORDERS,
   ADD_TO_CLIENT_ORDERS,
   EDIT_ORDER,
   REMOVE_ORDER
} from "../actionTypes";
import { editStore } from "../../utility/utility";

const defaultState = [];

const loadOrders = (state, action) => {
   return [...action.orders];
};

const addToClientOrders = (state, action) => {
   const newState = [action.order, ...state];
   return newState;
};

const removeOrder = (state, action) => {
   const newState = state.filter(o => o.orderId !== action.id);
   return newState;
};

const editOrder = (state, action) => {
   return editStore(state, action, "orderID");
};

const reducer = (state = defaultState, action) => {
   switch (action.type) {
      case LOAD_ORDERS:
         return loadOrders(state, action);
      case ADD_TO_CLIENT_ORDERS:
         return addToClientOrders(state, action);
      case EDIT_ORDER:
         return editOrder(state, action);
      case REMOVE_ORDER:
         return removeOrder(state, action);
      default:
         return state;
   }
};

export default reducer;
