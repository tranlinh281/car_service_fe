import {
 EMPLOYEE_LIST_FAIL,
 EMPLOYEE_LIST_REQUEST,
 EMPLOYEE_LIST_SUCCESS,
 USER_LOGIN_FAIL,
 USER_LOGIN_REQUEST,
 USER_LOGIN_SUCCESS,
 USER_LOGOUT
} from 'src/constants/userConstant';

export const userLoginReducer = (state = {}, action) => {
 switch (action.type) {
  case USER_LOGIN_REQUEST:
   return { loading: true };
  case USER_LOGIN_SUCCESS:
   return { loading: false, userInfo: action.payload };
  case USER_LOGIN_FAIL:
   return { loading: false, error: action.payload };
  case USER_LOGOUT:
   return {};
  default:
   return state;
 }
};
export const listEmployeeReducer = (state = {}, action) => {
 switch (action.type) {
  case EMPLOYEE_LIST_REQUEST:
    console.log("logra")
   return { loading: true };
  case EMPLOYEE_LIST_SUCCESS:
   return { loading: false, employees: action.payload };
  case EMPLOYEE_LIST_FAIL:
   return { loading: false, error: action.payload };
  default:
   return state;
 }
};
