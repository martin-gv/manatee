import { apiCall } from "../../services/api";
import { addError, removeError } from "./errors";
import { setDataLoadedStatus, toggleModalV2 } from "./system";

import {
   LOAD_ORDERS,
   ADD_TO_CLIENT_ORDERS,
   EDIT_ORDER,
   REMOVE_ORDER
} from "../actionTypes";

// LOCAL ACTIONS

export function loadOrders(orders) {
   return {
      type: LOAD_ORDERS,
      orders
   };
}

export function addToClientOrders(order) {
   return {
      type: ADD_TO_CLIENT_ORDERS,
      order
   };
}

export function editOrder(orderID, field, value) {
   return {
      type: EDIT_ORDER,
      id: orderID,
      field,
      value
   };
}

export function removeOrder(orderId) {
   return {
      type: REMOVE_ORDER,
      id: orderId
   };
}

// DATABASE API CALLS

export function createOrder(clientID, companyID) {
   return dispatch => {
      return apiCall("post", "/api/clients/" + clientID + "/orders", {
         companyID
      })
         .then(res => {
            dispatch(removeError());
            dispatch(addToClientOrders(res));
            return res;
         })
         .catch(err => {
            dispatch(addError(err.message));
         });
   };
}

export function fetchOrder() {
   return dispatch => {
      return apiCall("get", "/api/orders")
         .then(res => {
            dispatch(removeError());
            dispatch(loadOrders(res));
            dispatch(setDataLoadedStatus("orderList"));
         })
         .catch(err => {
            dispatch(addError(err.message));
         });
   };
}

export function fetchOrderByID(orderID) {
   return dispatch => {
      return apiCall("get", "/api/orders/" + orderID)
         .then(res => {
            dispatch(removeError());
            return res;
         })
         .catch(err => {
            dispatch(addError(err.message));
         });
   };
}

export function fetchClientOrders(clientID) {
   return dispatch => {
      return apiCall("get", "/api/clients/" + clientID + "/orders")
         .then(res => {
            dispatch(removeError());
            dispatch(loadOrders(res));
            dispatch(setDataLoadedStatus("clientOrderList"));
         })
         .catch(err => {
            dispatch(addError(err.message));
         });
   };
}

export function fetchCompanyOrders(companyID) {
   return dispatch => {
      return apiCall("get", "/api/companies/" + companyID + "/orders")
         .then(res => {
            dispatch(removeError());
            dispatch(loadOrders(res));
            return res;
         })
         .catch(err => {
            dispatch(addError(err.message));
         });
   };
}

export function searchOrders(from, to) {
   const search = { from, to };
   console.log("from", search.from, typeof search.from);
   console.log("to", search.to, typeof search.to);
   return dispatch => {
      return apiCall("get", "/api/orders", { params: { search } })
         .then(res => {
            dispatch(removeError());
            return res;
         })
         .catch(err => {
            dispatch(addError(err.message));
         });
   };
}

export function updateOrder(order) {
   return dispatch => {
      return apiCall("put", "/api/orders/" + order.orderID, { order })
         .then(res => {
            dispatch(removeError());
            dispatch(toggleModalV2(true, "Success: Order Saved"));
            return res;
         })
         .catch(err => {
            dispatch(addError(err.message));
         });
   };
}

export function deleteOrder(id) {
   return dispatch => {
      return apiCall("delete", `/api/orders/${id}`)
         .then(res => {
            dispatch(removeError());
            dispatch(removeOrder(res.orderId));
         })
         .catch(err => {
            dispatch(addError(err.message));
         });
   };
}
