import { apiCall } from "../../services/api";
import { addError, removeError } from "./errors";
import {
   setDataLoadedStatus,
   toggleModalV2,
   resetDataLoadedStatus
} from "./system";

import {
   LOAD_INVENTORY,
   ADD_TO_INVENTORY,
   INVENTORY_TEXT_INPUT_CHANGE,
   EDIT_INVENTORY,
   REMOVE_INVENTORY_ITEM
} from "../actionTypes";

export function loadInventory(inventory) {
   return {
      type: LOAD_INVENTORY,
      inventory
   };
}

export function addToInventory(item) {
   return {
      type: ADD_TO_INVENTORY,
      item
   };
}

export function removeInventoryItem(inventoryID) {
   return {
      type: REMOVE_INVENTORY_ITEM,
      inventoryID
   };
}

export function inventoryTextInputChange(event, id) {
   return {
      type: INVENTORY_TEXT_INPUT_CHANGE,
      id,
      field: event.target.name,
      value: event.target.value
   };
}

export function editInventory(inventoryID, field, value) {
   return {
      type: EDIT_INVENTORY,
      id: inventoryID,
      field,
      value
   };
}

// DATABASE API CALLS

export function createInventoryItem(data) {
   return dispatch => {
      return apiCall("post", "/api/inventory", { inventory: data })
         .then(res => {
            dispatch(removeError());
            dispatch(addToInventory(res));
         })
         .catch(err => {
            dispatch(addError(err.message));
         });
   };
}

export function searchInventory(input) {
   return dispatch => {
      dispatch(resetDataLoadedStatus("inventoryListRows"));
      return apiCall("get", "/api/inventory", { params: { search: input } })
         .then(res => {
            dispatch(removeError());
            dispatch(loadInventory(res));
            dispatch(setDataLoadedStatus("inventoryListRows"));
         })
         .catch(err => {
            dispatch(addError(err.message));
         });
   };
}

export function fetchInventory() {
   return dispatch => {
      return apiCall("get", "/api/inventory")
         .then(res => {
            dispatch(removeError());
            dispatch(loadInventory(res));
            dispatch(setDataLoadedStatus("inventoryList"));
         })
         .catch(err => {
            dispatch(addError(err.message));
         });
   };
}

export function fetchInventoryByID(inventoryID) {
   return dispatch => {
      return inventoryID
         ? apiCall("get", "/api/inventory/" + inventoryID)
              .then(res => {
                 dispatch(removeError());
                 return res;
              })
              .catch(err => {
                 dispatch(addError(err.message));
              })
         : Promise.resolve();
   };
}

// export function fetchOrderById(orderId) {
//    return dispatch => {
//       return apiCall("get", `/api/orders/${orderId}`)
//          .then(res => {
//             dispatch(loadOrders(res));
//             dispatch(setDataLoadedStatus("orderForm"));
//          })
//          .catch(err => {
//             dispatch(addError(err.message));
//          });
//    };
// }

export function updateInventory(item) {
   return dispatch => {
      return apiCall("put", "/api/inventory/" + item.inventoryID, {
         inventory: item
      })
         .then(res => {
            const title = "Success";
            const message = `Inventory item ${res.title} saved successfully`;
            dispatch(removeError());
            dispatch(toggleModalV2(true, title, message));
         })
         .catch(err => {
            dispatch(addError(err.message));
         });
   };
}

export function deleteInventory(inventoryID) {
   return dispatch => {
      return apiCall("delete", "/api/inventory/" + inventoryID)
         .then(res => {
            dispatch(removeError());
            dispatch(removeInventoryItem(res.inventoryID));
            const message = `${res.title} is now deleted`;
            dispatch(toggleModalV2(true, "Item deleted!", message));
            return res;
         })
         .catch(err => {
            dispatch(addError(err.message));
         });
   };
}
