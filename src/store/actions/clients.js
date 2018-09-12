import { apiCall } from "../../services/api";
import { addError, removeError } from "./errors";
import { toggleModal } from "./system";
import {
   LOAD_CLIENTS,
   UPDATE_CLIENT,
   LOAD_TAG,
   REMOVE_TAG
} from "../actionTypes";

export function loadClients(clients) {
   return {
      type: LOAD_CLIENTS,
      clients
   };
}

export function updateClient(id, event) {
   return {
      type: UPDATE_CLIENT,
      id,
      field: event.target.name,
      value: event.target.value
   };
}

export function fetchClient(search, tagSearch) {
   return dispatch => {
      return apiCall("get", "/api/clients", {
         params: { search, "tagSearch": tagSearch }
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
      return apiCall("put", "/api/clients/" + data.clientId, { client: data })
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

export function loadTag(clientId, tag) {
   return {
      type: LOAD_TAG,
      clientId,
      tag
   };
}

export function removeTag(clientId, tag) {
   return {
      type: REMOVE_TAG,
      clientId,
      tag
   };
}

export function addTagToClient(clientId, tag, op) {
   // is clientId needed in data object? not according to API endpoint used
   const data = {
      clientId,
      [op]: { tags: tag._id },
      skipPreUpdateHook: true
   };

   return dispatch => {
      return apiCall("put", `/api/clients/${clientId}`, { client: data })
         .then(res => {
            dispatch(removeError());
            if (op === "$push") {
               dispatch(loadTag(clientId, tag));
            } else if (op === "$pull") {
               dispatch(removeTag(clientId, tag));
            }
         })
         .catch(err => {
            dispatch(addError(err.message));
         });
   };
}
