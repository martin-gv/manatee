import { apiCall } from "../../services/api";

import { addError, removeError } from "./errors";
import { toggleModalV2 } from "./system";
import {
   LOAD_COMPANY_DATA,
   COMPANY_INPUT_CHANGE,
   ADD_COMPANY_CONTACT,
   REMOVE_COMPANY_CONTACT
} from "../actionTypes";

export function loadData(data) {
   return {
      type: LOAD_COMPANY_DATA,
      data
   };
}

export function companyInputChange(event, id) {
   return {
      type: COMPANY_INPUT_CHANGE,
      field: event.target.name,
      value: event.target.value,
      id
   };
}

export function addCompanyContact(companyID, client) {
   return {
      type: ADD_COMPANY_CONTACT,
      companyID,
      client
   };
}

export function removeCompanyContact(companyID, id) {
   return {
      type: REMOVE_COMPANY_CONTACT,
      companyID,
      id
   };
}

// export function addNewOrderRow(obj) {
//    return {
//       type: ADD_NEW_ORDER_ROW,
//       obj
//    };
// }

// export function removeRow(id) {
//    return {
//       type: REMOVE_ROW,
//       id
//    };
// }

// export function setSelectedOrderRow(id) {
//    return {
//       type: SET_SELECTED_ORDER_ROW,
//       id
//    };
// }

// DATABASE API CALLS

// export function createOrderRow(orderId, rowNum) {
//    return dispatch => {
//       return apiCall("post", `/api/order_rows`, {
//          row: { orderId, rowNum }
//       })
//          .then(res => {
//             dispatch(removeError());
//             dispatch(addNewOrderRow(res));
//             dispatch(setSelectedOrderRow(res._id));
//             return res;
//          })
//          .catch(err => {
//             dispatch(addError(err.message));
//          });
//    };
// }

export function fetchCompany(companyID) {
   return dispatch => {
      return apiCall("get", "/api/companies", { params: { companyID } })
         .then(res => {
            dispatch(removeError());
            dispatch(loadData(res));
            return res;
         })
         .catch(err => {
            dispatch(addError(err.message));
         });
   };
}

export function updateCompany(company) {
   return dispatch => {
      const { companyID } = company;
      return apiCall("put", "/api/companies/" + companyID, { company })
         .then(res => {
            dispatch(removeError());
            dispatch(toggleModalV2(true, "Success", "Save succesful"));
            return true;
         })
         .catch(err => {
            dispatch(addError(err.message));
         });
   };
}

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
