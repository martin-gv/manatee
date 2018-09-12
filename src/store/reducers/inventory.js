import {
   LOAD_INVENTORY,
   ADD_TO_INVENTORY,
   INVENTORY_TEXT_INPUT_CHANGE,
   REMOVE_INVENTORY_ITEM,
   EDIT_INVENTORY
} from "../actionTypes";
import { editStore } from "../../utility/utility";

const defaultState = [];

const loadInventory = (state, action) => {
   return [...action.inventory];
};

const addToInventory = (state, action) => {
   const newState = [action.item, ...state];
   return newState;
};

const removeInventoryItem = (state, action) => {
   const newState = state.filter(i => i.inventoryID !== action.id);
   return newState;
};

const inventoryTextInputChange = (state, action) => {
   const index = state.findIndex(i => i.inventoryID === action.id);
   const newState = [...state];
   newState[index] = {
      ...newState[index],
      [action.field]: action.value
   };
   return newState;
};

const editInventory = (state, action) => {
   return editStore(state, action, "inventoryID");
};

const reducer = (state = defaultState, action) => {
   switch (action.type) {
      case LOAD_INVENTORY:
         return loadInventory(state, action);
      case ADD_TO_INVENTORY:
         return addToInventory(state, action);
      case INVENTORY_TEXT_INPUT_CHANGE:
         return inventoryTextInputChange(state, action);
      case REMOVE_INVENTORY_ITEM:
         return removeInventoryItem(state, action);
      case EDIT_INVENTORY:
         return editInventory(state, action);
      default:
         return state;
   }
};

export default reducer;
