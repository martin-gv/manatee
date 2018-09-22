import { apiCall } from "../../services/api";
import { addError, removeError } from "./errors";

import {
   SET_DATA_LOADED_STATUS,
   RESET_DATA_LOADED_STATUS,
   TOGGLE_MODAL,
   TOGGLE_MODAL_V2,
   LOAD_TAG_DATA,
   LOAD_PRICING_COLUMN_DATA,
   LOAD_PRICING_ROW_DATA,
   SET_DATA_READY_STATUS
} from "../actionTypes";

export function setDataLoadedStatus(component) {
   return {
      type: SET_DATA_LOADED_STATUS,
      component
   };
}

export function resetDataLoadedStatus(component) {
   return {
      type: RESET_DATA_LOADED_STATUS,
      component
   };
}

export function toggleModal(modal) {
   return {
      type: TOGGLE_MODAL,
      modal
   };
}

export function toggleModalV2(isOpen, title, message) {
   return {
      type: TOGGLE_MODAL_V2,
      isOpen,
      title,
      message
   };
}

export function setDataReadyStatus(component, status) {
   return {
      type: SET_DATA_READY_STATUS,
      component,
      status
   };
}

// Client Tag Actions

export function loadTagData(data) {
   return {
      type: LOAD_TAG_DATA,
      data
   };
}

export function fetchTag() {
   return dispatch => {
      return apiCall("get", "/api/clients/tags")
         .then(res => {
            dispatch(removeError());
            dispatch(loadTagData(res));
         })
         .catch(err => {
            dispatch(addError(err.message));
         });
   };
}

// Pricing Program Actions

export function loadPricingColumnData(data) {
   return {
      type: LOAD_PRICING_COLUMN_DATA,
      data
   };
}

export function loadPricingRowData(data) {
   return {
      type: LOAD_PRICING_ROW_DATA,
      data
   };
}

export function fetchPricingColumn() {
   return dispatch => {
      return apiCall("get", "/api/pricing/columns")
         .then(res => {
            dispatch(removeError());
            dispatch(loadPricingColumnData(res));
         })
         .catch(err => {
            dispatch(addError(err.message));
         });
   };
}

export function fetchPricingRow() {
   return dispatch => {
      return apiCall("get", "/api/pricing/rows")
         .then(res => {
            dispatch(removeError());
            dispatch(loadPricingRowData(res));
         })
         .catch(err => {
            dispatch(addError(err.message));
         });
   };
}
