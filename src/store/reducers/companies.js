import {
   LOAD_COMPANY_DATA,
   COMPANY_INPUT_CHANGE,
   ADD_COMPANY_CONTACT,
   REMOVE_COMPANY_CONTACT
} from "../actionTypes";

const defaultState = [];

const loadData = (state, action) => {
   return [...action.data];
};

const inputChange = (state, action) => {
   const index = state.findIndex(
      el => el._id === action.id || el.companyID === +action.id
   );
   const newState = [...state];
   newState[index] = {
      ...state[index],
      [action.field]: action.value
   };
   return newState;
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
      case COMPANY_INPUT_CHANGE:
         return inputChange(state, action);
      case ADD_COMPANY_CONTACT:
         return addCompanyContact(state, action);
      case REMOVE_COMPANY_CONTACT:
         return removeCompanyContact(state, action);
      default:
         return state;
   }
};

export default reducer;
