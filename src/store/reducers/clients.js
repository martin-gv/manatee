import {
   LOAD_CLIENTS,
   EDIT_CLIENT,
   LOAD_TAG,
   REMOVE_TAG
} from "../actionTypes";
import { editStore } from "../../utility/utility";

const defaultState = [];

const loadClients = (state, action) => {
   return [...action.clients];
};

const editClient = (state, action) => {
   return editStore(state, action, "clientID");
};

const loadTag = (state, action) => {
   const index = state.findIndex(c => c.clientId === action.clientId);
   const client = {
      ...state[index],
      tags: [...state[index].tags, action.tag]
   };

   // refactor so whole array is unmodified except for client
   // in case there needs to be other clients in the store
   // in the future. something like the code below
   //    const newState = [...state];
   //    newState[index] = {
   //       ...newState[index],
   //       tags: []
   //    };
   return [client];
};

const removeTag = (state, action) => {
   const index = state.findIndex(c => c.clientId === action.clientId);
   const updatedTags = state[index].tags.filter(
      el => el._id !== action.tag._id
   );
   const client = {
      ...state[index],
      tags: updatedTags
   };
   // refactor so whole array is unmodified except for client
   // in case there needs to be other clients in the store in the future
   return [client];
};

const reducer = (state = defaultState, action) => {
   switch (action.type) {
      case LOAD_CLIENTS:
         return loadClients(state, action);
      case EDIT_CLIENT:
         return editClient(state, action);
      case LOAD_TAG:
         return loadTag(state, action);
      case REMOVE_TAG:
         return removeTag(state, action);
      default:
         return state;
   }
};

export default reducer;
