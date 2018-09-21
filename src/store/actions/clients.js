import { apiCall } from "../../services/api";
import { addError, removeError } from "./errors";
import { toggleModal } from "./system";
import {
   LOAD_CLIENTS,
   LOAD_TAG,
   REMOVE_TAG,
   EDIT_CLIENT
} from "../actionTypes";

// LOCAL ACTIONS

export function loadClients(clients) {
   return {
      type: LOAD_CLIENTS,
      clients
   };
}

export function updateClient(clientID, field, value) {
   // DOES NOTHING
   return {
      type: EDIT_CLIENT
   };
}

export function editClient(clientID, field, value) {
   return {
      type: EDIT_CLIENT,
      id: clientID,
      field,
      value
   };
}

// DATABASE API CALLS

export function fetchClient(search, tagSearch) {
   return dispatch => {
      return apiCall("get", "/api/clients", {
         params: { search, tagSearch: tagSearch }
      })
         .then(res => {
            dispatch(removeError());
            return res;
         })
         .catch(err => {
            dispatch(addError(err.message));
         });
   };
}

export function fetchClientById(id) {
   return dispatch => {
      return apiCall("get", `/api/clients/${id}`)
         .then(res => {
            dispatch(removeError());
            return res;
         })
         .catch(err => {
            dispatch(addError(err.message));
         });
   };
}

export function fetchClientByID_v2(clientID) {
   return dispatch => {
      return apiCall("get", "/api/clients/" + clientID)
         .then(res => {
            dispatch(removeError());
            return res;
         })
         .catch(err => {
            dispatch(addError(err.message));
         });
   };
}

export function createClient(client) {
   return dispatch => {
      return apiCall("post", "/api/clients", client)
         .then(res => {
            dispatch(removeError());
            return res;
         })
         .catch(err => {
            dispatch(addError(err.message));
         });
   };
}

export function saveClient(data) {
   return dispatch => {
      return apiCall("put", "/api/clients/" + data.clientID, { client: data })
         .then(res => {
            dispatch(removeError());
            dispatch(toggleModal("clientSaveConfirmation"));
            return true;
         })
         .catch(err => {
            dispatch(addError(err.message));
         });
   };
}

export function deleteClient(id, history) {
   return dispatch => {
      return apiCall("delete", `/api/clients/${id}`)
         .then(res => {
            dispatch(removeError());
            history.push("/clients");
         })
         .catch(err => {
            dispatch(addError(err.message));
         });
   };
}

// Client Tag Actions

export function loadTag(clientID, tag) {
   return {
      type: LOAD_TAG,
      clientID,
      tag
   };
}

export function removeTag(clientID, tag) {
   return {
      type: REMOVE_TAG,
      clientID,
      tag
   };
}

export function addTagToClient(clientID, tag, op) {
   const data = {
      [op]: { tags: tag._id },
      skipPreUpdateHook: true
   };

   return dispatch => {
      return apiCall("put", "/api/clients/" + clientID, { client: data })
         .then(res => {
            dispatch(removeError());
            if (op === "$push") {
               dispatch(loadTag(clientID, tag));
            } else if (op === "$pull") {
               dispatch(removeTag(clientID, tag));
            }
         })
         .catch(err => {
            dispatch(addError(err.message));
         });
   };
}
