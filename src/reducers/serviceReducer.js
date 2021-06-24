import {
 CREATE_SERVICE_FAIL,
 CREATE_SERVICE_REQUEST,
 CREATE_SERVICE_SUCCESS,
 DELETE_SERVICE_FAIL,
 DELETE_SERVICE_REQUEST,
 DELETE_SERVICE_SUCCESS,
 EDIT_SERVICE_FAIL,
 EDIT_SERVICE_REQUEST,
 EDIT_SERVICE_SUCCESS,
 SERVICE_LIST_FAIL,
 SERVICE_LIST_REQUEST,
 SERVICE_LIST_SUCCESS,
 SERVICE_TYPE_LIST_FAIL,
 SERVICE_TYPE_LIST_REQUEST,
 SERVICE_TYPE_LIST_SUCCESS
} from 'src/constants/serviceConstant';

export const listServiceReducer = (
 state = { loading: true, services: [] },
 action
) => {
 switch (action.type) {
  case SERVICE_LIST_REQUEST:
   return { loading: true };
  case SERVICE_LIST_SUCCESS:
   return {
    loading: false,
    services: action.payload
   };
  case SERVICE_LIST_FAIL:
   return { loading: false, error: action.payload };
  default:
   return state;
 }
};

export const listServiceTypeReducer = (
 state = { loading: true, types: [] },
 action
) => {
 switch (action.type) {
  case SERVICE_TYPE_LIST_REQUEST:
   return { loading: true };
  case SERVICE_TYPE_LIST_SUCCESS:
   return {
    loading: false,
    types: action.payload
   };
  case SERVICE_TYPE_LIST_FAIL:
   return { loading: false, error: action.payload };
  default:
   return state;
 }
};
export const createServiceReducer = (state = {}, action) => {
 switch (action.type) {
  case CREATE_SERVICE_REQUEST:
   return { loading: true };
  case CREATE_SERVICE_SUCCESS:
   return { loading: false, success: action.payload };
  case CREATE_SERVICE_FAIL:
   return { loading: false, error: action.payload };
  default:
   return state;
 }
};
export const deleteServiceReducer = (state = {}, action) => {
 switch (action.type) {
  case DELETE_SERVICE_REQUEST:
   return { loading: true };
  case DELETE_SERVICE_SUCCESS:
   return { loading: false, success: action.payload };
  case DELETE_SERVICE_FAIL:
   return { loading: false, error: action.payload };
  default:
   return state;
 }
};
export const updateServiceReducer = (state = {}, action) => {
 switch (action.type) {
  case EDIT_SERVICE_REQUEST:
   return { loading: true };
  case EDIT_SERVICE_SUCCESS:
   return { loading: false, success: action.payload };
  case EDIT_SERVICE_FAIL:
   return { loading: false, error: action.payload };
  default:
   return state;
 }
};
