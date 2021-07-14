import {
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
