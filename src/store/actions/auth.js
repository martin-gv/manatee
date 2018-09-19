import { apiCall, setTokenHeader } from "../../services/api";
import { addError, removeError } from "./errors";
import { SET_CURRENT_USER, SET_IDLE_TIMEOUT } from "../actionTypes";

export function setCurrentUser(user) {
   return {
      type: SET_CURRENT_USER,
      user
   };
}

export function setAuthorizationToken(token) {
   setTokenHeader(token);
}

export function authUser(type, userData) {
   return dispatch => {
      return new Promise((resolve, reject) => {
         return apiCall("post", `/api/auth/${type}`, userData)
            .then(({ token, ...user }) => {
               localStorage.setItem("jwtToken", token);
               setAuthorizationToken(token);
               dispatch(setCurrentUser(user));
               dispatch(removeError());
               resolve();
            })
            .catch(err => {
               dispatch(addError(err.message));
               reject();
            });
      });
   };
}

export function logout() {
   return dispatch => {
      localStorage.clear();
      setAuthorizationToken(false);
      dispatch(setCurrentUser({}));
   };
}

export function setIdleTimeout(timeoutID) {
   return {
      type: SET_IDLE_TIMEOUT,
      timeoutID
   };
}

export function resetIdleTimeout(currentTimer) {
   return dispatch => {
      if (currentTimer) clearTimeout(currentTimer);
      const newTimeout = setTimeout(() => {
         dispatch(addError("Logging user out due to inactivity"));
         dispatch(logout());
      }, 1000 * 60 * 30);
      dispatch(setIdleTimeout(newTimeout));
   };
}
