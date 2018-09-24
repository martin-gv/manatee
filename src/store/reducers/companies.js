import {
   LOAD_COMPANY_DATA,
   EDIT_COMPANY,
   ADD_COMPANY_CONTACT,
   REMOVE_COMPANY_CONTACT
} from "../actionTypes";
import { editStore } from "../../utility/utility";

const defaultState = [];

const loadData = (state, action) => {
   return [...action.data];
};

const editCompany = (state, action) => {
   return editStore(state, action, "companyID");
};

const addCompanyContact = (state, action) => {
   const index = state.findIndex(el => el.companyID === +action.companyID);
   const newState = [...state];
   newState[index] = {
      ...state[index],
      contacts: [...newState[index].contacts, action.client]
   };
   return newState;
};

const removeCompanyContact = (state, action) => {
   const index = state.findIndex(el => el.companyID === +action.companyID);
   const newState = [...state];
   newState[index] = {
      ...newState[index],
      contacts: state[index].contacts.filter(el => el._id !== action.id)
   };
   return newState;
};

// const addNewOrderRow = (state, action) => {
//    return [...state, action.obj];
// };

// const removeRow = (state, action) => {
//    return state.filter(el => el._id !== action.id);
// };

const reducer = (state = defaultState, action) => {
   switch (action.type) {
      case LOAD_COMPANY_DATA:
         return loadData(state, action);
      case EDIT_COMPANY:
         return editCompany(state, action);
      case ADD_COMPANY_CONTACT:
         return addCompanyContact(state, action);
      case REMOVE_COMPANY_CONTACT:
         return removeCompanyContact(state, action);
      default:
         return state;
   }
};

export default reducer;
