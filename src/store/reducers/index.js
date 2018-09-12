import { combineReducers } from "redux";
import users from "./users";
import errors from "./errors";
import system from "./system";
import clients from "./clients";
import companies from "./companies";
import orders from "./orders";
import orderRows from "./orderRows";
import payments from "./payments";
import inventory from "./inventory";

const rootReducer = combineReducers({
   users,
   errors,
   system,
   clients,
   companies,
   orders,
   payments,
   orderRows,
   inventory
});

export default rootReducer;
