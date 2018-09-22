import { apiCall } from "../../services/api";
import { addError, removeError } from "./errors";

// LOCAL ACTIONS


// DATABASE API CALLS

export function createTag(data) {
   return dispatch => {
      return apiCall("post", "/api/tags", { tag: data })
         .then(res => {
            dispatch(removeError());
            return res;
         })
         .catch(err => {
            dispatch(addError(err.message));
         });
   };
}
