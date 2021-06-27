import {
 ACCESSORY_LIST_FAIL,
 ACCESSORY_LIST_REQUEST,
 ACCESSORY_LIST_SUCCESS,
 ACCESSORY_TYPE_LIST_FAIL,
 ACCESSORY_TYPE_LIST_REQUEST,
 ACCESSORY_TYPE_LIST_SUCCESS,
 CREATE_ACCESSORY_FAIL,
 CREATE_ACCESSORY_REQUEST,
 CREATE_ACCESSORY_SUCCESS,
 CREATE_ACCESSORY_TYPE_FAIL,
 CREATE_ACCESSORY_TYPE_REQUEST,
 CREATE_ACCESSORY_TYPE_SUCCESS,
 DELETE_ACCESSORY_FAIL,
 DELETE_ACCESSORY_REQUEST,
 DELETE_ACCESSORY_SUCCESS,
 EDIT_ACCESSORY_FAIL,
 EDIT_ACCESSORY_REQUEST,
 EDIT_ACCESSORY_SUCCESS
} from 'src/constants/accessoryConstant';

export const listAccessoryReducer = (
 state = { loading: true, accessories: [] },
 action
) => {
 switch (action.type) {
  case ACCESSORY_LIST_REQUEST:
   return { loading: true };
  case ACCESSORY_LIST_SUCCESS:
   return {
    loading: false,
    accessories: action.payload
   };
  case ACCESSORY_LIST_FAIL:
   return { loading: false, error: action.payload };
  default:
   return state;
 }
};

export const createAccessoryReducer = (state = {}, action) => {
 switch (action.type) {
  case CREATE_ACCESSORY_REQUEST:
   return { ...state, loading: true };
  case CREATE_ACCESSORY_SUCCESS:
   return { ...state, loading: false, success: action.payload };
  case CREATE_ACCESSORY_FAIL:
   return { ...state, loading: false, error: action.payload };
  default:
   return state;
 }
};

export const deleteAccessoryReducer = (state = {}, action) => {
 switch (action.type) {
  case DELETE_ACCESSORY_REQUEST:
   return { ...state, loading: true };
  case DELETE_ACCESSORY_SUCCESS:
   return { ...state, loading: false, success: action.payload };
  case DELETE_ACCESSORY_FAIL:
   return { ...state, loading: false, error: action.payload };
  default:
   return state;
 }
};
export const updateAccessoryReducer = (state = {}, action) => {
 switch (action.type) {
  case EDIT_ACCESSORY_REQUEST:
   return { ...state, loading: true };
  case EDIT_ACCESSORY_SUCCESS: {
   return { ...state, loading: false, success: action.payload, test: '123' };
  }
  case EDIT_ACCESSORY_FAIL:
   return { ...state, loading: false, error: action.payload };
  default:
   return state;
 }
};

export const listAccessoryTypeReducer = (
 state = { loading: true, types: [] },
 action
) => {
 switch (action.type) {
  case ACCESSORY_TYPE_LIST_REQUEST:
   return { ...state, loading: true };
  case ACCESSORY_TYPE_LIST_SUCCESS:
   return { ...state, loading: false, types: action.payload };
  case ACCESSORY_TYPE_LIST_FAIL:
   return { ...state, loading: false, error: action.payload };
  default:
   return state;
 }
};

export const createAccessoryTypeReducer = (state = {}, action) => {
 switch (action.type) {
  case CREATE_ACCESSORY_TYPE_REQUEST:
   return { ...state, loading: true };
  case CREATE_ACCESSORY_TYPE_SUCCESS:
   return { ...state, loading: false, success: action.payload };
  case CREATE_ACCESSORY_TYPE_FAIL:
   return { ...state, loading: false, error: action.payload };
  default:
   return state;
 }
};
