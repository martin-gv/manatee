// todo: eventually remove React dates from app

import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { configureStore } from "./store";
import jwtDecode from "jwt-decode";
// import "react-dates/initialize";

import { setAuthorizationToken, setCurrentUser } from "./store/actions/auth";

import "./App.css";
import "./Animations.css";
// import "react-dates/lib/css/_datepicker.css";
import "react-select/dist/react-select.css";
import "react-day-picker/lib/style.css";

import Navbar from "./components/UI/Navbar/Navbar";
import Main from "./components/UI/Main/Main";
import Sidebar from "./components/UI/Sidebar/Sidebar";

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
      <Router>
         <div className="onboarding">
            <Navbar />
            <Sidebar />
            <Main />
         </div>
      </Router>
   </Provider>
);

export default App;
