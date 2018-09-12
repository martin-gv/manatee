import {
   LOAD_ORDER_ROWS,
   REMOVE_ROW,
   ADD_NEW_ORDER_ROW,
   EDIT_ROW
} from "../actionTypes";
import { editStore } from "../../utility/utility";

const defaultState = [];

const loadOrderRows = (state, action) => {
   return [...action.orderRows];
};

const addNewOrderRow = (state, action) => {
   return [...state, action.obj];
};

const removeRow = (state, action) => {
   return state.filter(el => el._id !== action.id);
};

const editRow = (state, action) => {
   return editStore(state, action, "_id");
};

const reducer = (state = defaultState, action) => {
   switch (action.type) {
      case LOAD_ORDER_ROWS:
         return loadOrderRows(state, action);
      case ADD_NEW_ORDER_ROW:
         return addNewOrderRow(state, action);
      case REMOVE_ROW:
         return removeRow(state, action);
      case EDIT_ROW:
         return editRow(state, action);
      default:
         return state;
   }
};

export default reducer;
