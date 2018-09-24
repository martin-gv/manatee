import { apiCall } from "../../services/api";

import { addError, removeError } from "./errors";
import { setDataLoadedStatus, toggleModalV2 } from "./system";

import {
   LOAD_ORDER_ROWS,
   ADD_NEW_ORDER_ROW,
   REMOVE_ROW,
   SET_SELECTED_ORDER_ROW,
   EDIT_ROW
} from "../actionTypes";

// LOCAL ACTIONS

export function loadOrderRows(orderRows) {
   return {
      type: LOAD_ORDER_ROWS,
      orderRows
   };
}

export function addNewOrderRow(obj) {
   return {
      type: ADD_NEW_ORDER_ROW,
      obj
   };
}

export function removeRow(id) {
   return {
      type: REMOVE_ROW,
      id
   };
}

export function setSelectedOrderRow(id) {
   return {
      type: SET_SELECTED_ORDER_ROW,
      id
   };
}

export function editRow(id, field, value) {
   return {
      type: EDIT_ROW,
      id,
      field,
      value
   };
}

// DATABASE API CALLS

export function createOrderRow(orderID, rowNum, arr) {
   return dispatch => {
      const row = { orderID, rowNum };
      return apiCall("post", "/api/order_rows", { row: arr || row })
         .then(res => {
            dispatch(removeError());
            dispatch(addNewOrderRow(res));
            dispatch(setSelectedOrderRow(res._id));
            return res;
         })
         .catch(err => {
            dispatch(addError(err.message));
         });
   };
}

export function fetchOrderRow(orderID) {
   return dispatch => {
      return apiCall("get", "/api/order_rows", { params: { orderID } })
         .then(res => {
            dispatch(removeError());
            dispatch(loadOrderRows(res));
            dispatch(setDataLoadedStatus("orderRow"));
            return res;
         })
         .catch(err => {
            dispatch(addError(err.message));
         });
   };
}

export function updateOrderRow(row) {
   return dispatch => {
      return apiCall("put", "/api/order_rows/" + row._id, { row })
         .then(res => {
            dispatch(removeError());
            return res;
         })
         .catch(err => {
            dispatch(addError(err.message));
         });
   };
}

export function deleteOrderRow(id) {
   return dispatch => {
      return apiCall("delete", `/api/order_rows/${id}`)
         .then(res => {
            dispatch(removeError());
            dispatch(removeRow(res._id));
            dispatch(setSelectedOrderRow(null));
            dispatch(toggleModalV2(true, "Deleted!"));
         })
         .catch(err => {
            dispatch(addError(err.message));
         });
   };
}
