import {
 CREATE_MANUFACTURER_FAIL,
 CREATE_MANUFACTURER_REQUEST,
 CREATE_MANUFACTURER_SUCCESS,
 MANUFACTURER_LIST_ALL_FAIL,
 MANUFACTURER_LIST_ALL_REQUEST,
 MANUFACTURER_LIST_ALL_SUCCESS,
 MANUFACTURER_LIST_FAIL,
 MANUFACTURER_LIST_REQUEST,
 MANUFACTURER_LIST_SUCCESS
} from 'src/constants/ManufacturerConstant';

export const listManufacturerReducer = (
 state = { loading: true, data: [] },
 action
) => {
 switch (action.type) {
  case MANUFACTURER_LIST_REQUEST:
   return { ...state, loading: true };
  case MANUFACTURER_LIST_SUCCESS:
   return { ...state, loading: false, data: action.payload };
  case MANUFACTURER_LIST_FAIL:
   return { ...state, loading: false, error: action.payload };
  default:
   return state;
 }
};
export const listAllManufacturerReducer = (
 state = { loading: true, manufacturers: [] },
 action
) => {
 switch (action.type) {
  case MANUFACTURER_LIST_ALL_REQUEST:
   return { ...state, loading: true };
  case MANUFACTURER_LIST_ALL_SUCCESS:
   return { ...state, loading: false, manufacturers: action.payload };
  case MANUFACTURER_LIST_ALL_FAIL:
   return { ...state, loading: false, error: action.payload };
  default:
   return state;
 }
};

export const createManufacturerReducer = (state = {}, action) => {
 switch (action.type) {
  case CREATE_MANUFACTURER_REQUEST:
   return { ...state, loading: true };
  case CREATE_MANUFACTURER_SUCCESS:
   return { ...state, loading: false, success: action.payload };
  case CREATE_MANUFACTURER_FAIL:
   return { ...state, loading: false, error: action.payload };
  default:
   return state;
 }
};
