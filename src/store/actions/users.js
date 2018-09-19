import { apiCall } from "../../services/api";
import { addError, removeError } from "./errors";

// LOCAL ACTIONS

// export function loadPayments(data) {
//    return {
//       type: LOAD_PAYMENTS,
//       data
//    };
// }

// export function addNewPayment(obj) {
//    return {
//       type: ADD_NEW_PAYMENT,
//       obj
//    };
// }

// export function editPayment(paymentID, field, value) {
//    return {
//       type: EDIT_PAYMENT,
//       paymentID,
//       field,
//       value
//    };
// }

// DATABASE API CALLS

export function createUser(data) {
   return dispatch => {
      return apiCall("post", "/api/auth/signup", { user: data })
         .then(res => {
            dispatch(removeError());
            return res;
         })
         .catch(err => {
            dispatch(addError(err.message));
         });
   };
}

// export function fetchPayment(orderID) {
//    return dispatch => {
//       return apiCall("get", "/api/payments", { params: { orderID } }) // no parameter returns all records
//          .then(res => {
//             dispatch(removeError());
//             dispatch(loadPayments(res));
//             return res;
//          })
//          .catch(err => {
//             dispatch(addError(err.message));
//          });
//    };
// }

// export function updatePayment(paymentID, data) {
//    return dispatch => {
//       return apiCall("put", "/api/payments/" + paymentID, { data })
//          .then(res => {
//             dispatch(removeError());
//             return res;
//          })
//          .catch(err => {
//             dispatch(addError(err.message));
//          });
//    };
// }

// export function deleteOrderRow(id) {
//    return dispatch => {
//       return apiCall("delete", `/api/order_rows/${id}`)
//          .then(res => {
//             dispatch(removeError());
//             dispatch(removeRow(res._id));
//             dispatch(setSelectedOrderRow(null));
//             dispatch(toggleModalV2(true, "Deleted!", `It's gone: ${res._id}`));
//          })
//          .catch(err => {
//             dispatch(addError(err.message));
//          });
//    };
// }
