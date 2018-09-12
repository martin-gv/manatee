import {
   SET_DATA_LOADED_STATUS,
   RESET_DATA_LOADED_STATUS,
   TOGGLE_MODAL,
   TOGGLE_MODAL_V2,
   SET_SELECTED_ORDER_ROW,
   LOAD_CLIENT_TAG_OPTIONS,
   LOAD_PRICING_COLUMN_DATA,
   LOAD_PRICING_ROW_DATA,
   SET_DATA_READY_STATUS
} from "../actionTypes";

const defaultState = {
   isDataLoaded: {
      clientList: false,
      clientForm: false,
      clientOrderList: false,
      orderList: false,
      orderForm: false,
      orderRow: false,
      inventoryList: false,
      inventoryListRows: true
   },
   showModal: {
      clientSaveConfirmation: false
   },
   modal: {
      isOpen: false,
      title: "",
      message: ""
   },
   selectedRowId: null,
   clientTagOptions: [],
   pricingColumns: [],
   pricingRows: []
};

const setDataLoadedStatus = (state, action) => {
   const isDataLoaded = {
      ...state.isDataLoaded,
      [action.component]: true
   };
   return { ...state, isDataLoaded };
};

const resetDataLoadedStatus = (state, action) => {
   const isDataLoaded = {
      ...state.isDataLoaded,
      [action.component]: false
   };
   return { ...state, isDataLoaded };
};

const toggleModal = (state, action) => {
   const showModal = {
      ...state.showModal,
      [action.modal]: !state.showModal[action.modal]
   };
   return { ...state, showModal };
};

const toggleModalV2 = (state, action) => {
   const modal = {
      isOpen: action.isOpen,
      title: action.title,
      message: action.message
   };
   return { ...state, modal };
};

const setSelectedOrderRow = (state, action) => {
   return { ...state, selectedRowId: action.id };
};

const loadClientTagOptions = (state, action) => {
   return { ...state, clientTagOptions: action.data };
};

const loadPricingColumnData = (state, action) => {
   return { ...state, pricingColumns: action.data };
};

const loadPricingRowData = (state, action) => {
   return { ...state, pricingRows: action.data };
};

const setDataReadyStatus = (state, action) => {
   const isDataLoaded = {
      ...state.isDataLoaded,
      [action.component]: action.status
   };
   return { ...state, isDataLoaded };
};

const reducer = (state = defaultState, action) => {
   switch (action.type) {
      case SET_DATA_LOADED_STATUS:
         return setDataLoadedStatus(state, action);
      case RESET_DATA_LOADED_STATUS:
         return resetDataLoadedStatus(state, action);
      case TOGGLE_MODAL:
         return toggleModal(state, action);
      case TOGGLE_MODAL_V2:
         return toggleModalV2(state, action);
      case SET_SELECTED_ORDER_ROW:
         return setSelectedOrderRow(state, action);
      case LOAD_CLIENT_TAG_OPTIONS:
         return loadClientTagOptions(state, action);
      case LOAD_PRICING_COLUMN_DATA:
         return loadPricingColumnData(state, action);
      case LOAD_PRICING_ROW_DATA:
         return loadPricingRowData(state, action);
      case SET_DATA_READY_STATUS:
         return setDataReadyStatus(state, action);
      default:
         return state;
   }
};

export default reducer;
