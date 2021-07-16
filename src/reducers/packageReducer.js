import {
 PACKAGE_LIST_REQUEST,
 PACKAGE_LIST_SUCCESS,
 PACKAGE_LIST_FAIL
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
