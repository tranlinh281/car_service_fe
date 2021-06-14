import {
  CREATE_EMPLOYEE_FAIL,
  CREATE_EMPLOYEE_REQUEST,
  CREATE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_FAIL,
  DELETE_EMPLOYEE_REQUEST,
  DELETE_EMPLOYEE_SUCCESS,
  EDIT_EMPLOYEE_FAIL,
  EDIT_EMPLOYEE_REQUEST,
  EDIT_EMPLOYEE_SUCCESS,
  EMPLOYEE_LIST_FAIL,
  EMPLOYEE_LIST_REQUEST,
  EMPLOYEE_LIST_SUCCESS,
  TRIGGER_RELOAD,
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

export const listEmployeeReducer = (
  state = { loading: true, employees: [] },
  action
) => {
  switch (action.type) {
    case EMPLOYEE_LIST_REQUEST:
      return { loading: true };
    case EMPLOYEE_LIST_SUCCESS:
      return {
        loading: false,
        employees: action.payload
      };
    case EMPLOYEE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createEmployeeReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_EMPLOYEE_REQUEST:
      return { loading: true };
    case CREATE_EMPLOYEE_SUCCESS:
      return { loading: false, success: action.payload };
    case CREATE_EMPLOYEE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteEmployeeReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_EMPLOYEE_REQUEST:
      return { loading: true };
    case DELETE_EMPLOYEE_SUCCESS:
      return { loading: false, success: action.payload };
    case DELETE_EMPLOYEE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateEmployeeReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_EMPLOYEE_REQUEST:
      return { loading: true };
    case EDIT_EMPLOYEE_SUCCESS:
      return { loading: false, success: action.payload };
    case EDIT_EMPLOYEE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const reloadReducer = (state = {}, action) => {
  switch (action.type) {
    case TRIGGER_RELOAD:
      return { ...state };
    default:
      return state;
  }
};
