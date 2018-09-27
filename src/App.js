// todo: eventually remove React dates from app

import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "./store";
import jwtDecode from "jwt-decode";
// import "react-dates/initialize";

import { setAuthorizationToken, setCurrentUser } from "./store/actions/auth";

import "./App.css";
import "./Animations.css";
// import "react-dates/lib/css/_datepicker.css";
import "react-day-picker/lib/style.css";

import Start from "./Start";

const store = configureStore();

const { jwtToken } = localStorage;
if (jwtToken) {
   setAuthorizationToken(jwtToken);
   try {
      store.dispatch(setCurrentUser(jwtDecode(jwtToken)));
   } catch (err) {
      store.dispatch(setCurrentUser({}));
   }
}

const App = () => (
   <Provider store={store}>
      <Start />
   </Provider>
);

export default App;
