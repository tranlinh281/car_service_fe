import {
 PACKAGE_LIST_REQUEST,
 PACKAGE_LIST_SUCCESS,
 PACKAGE_LIST_FAIL,
 CREATE_PACKAGE_REQUEST,
 CREATE_PACKAGE_FAIL,
 CREATE_PACKAGE_SUCCESS,
 DELETE_PACKAGE_REQUEST,
 DELETE_PACKAGE_SUCCESS,
 DELETE_PACKAGE_FAIL
} from './../constants/packageConstant';

export const listPackageReducer = (
 state = { loading: true, data: [] },
 action
) => {
 switch (action.type) {
  case PACKAGE_LIST_REQUEST:
   return { ...state, loading: true };
  case PACKAGE_LIST_SUCCESS:
   return { ...state, loading: false, data: action.payload };
  case PACKAGE_LIST_FAIL:
   return { ...state, loading: false, error: action.payload };
  default:
   return state;
 }
};
export const createPackageReducer = (state = {}, action) => {
 switch (action.type) {
  case CREATE_PACKAGE_REQUEST:
   return { ...state, loading: true };
  case CREATE_PACKAGE_SUCCESS:
   return { ...state, loading: false, success: action.payload };
  case CREATE_PACKAGE_FAIL:
   return { ...state, loading: false, error: action.payload };
  default:
   return state;
 }
};    
export const deletePackageReducer = (state = {}, action) => {
 switch (action.type) {
  case DELETE_PACKAGE_REQUEST:
   return { ...state, loading: true };
  case DELETE_PACKAGE_SUCCESS:
   return { ...state, loading: false, success: action.payload };
  case DELETE_PACKAGE_FAIL:
   return { ...state, loading: false, error: action.payload };
  default:
   return state;
 }
};
