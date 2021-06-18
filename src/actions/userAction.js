import Axios from 'axios';
import {
  CREATE_EMPLOYEE_FAIL,
  CREATE_EMPLOYEE_REQUEST,
  CREATE_EMPLOYEE_SUCCESS,
  EMPLOYEE_LIST_FAIL,
  EMPLOYEE_LIST_REQUEST,
  EMPLOYEE_LIST_SUCCESS,
  EMPLOYEE_SEARCH_FAIL,
  EMPLOYEE_SEARCH_REQUEST,
  EMPLOYEE_SEARCH_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  TRIGGER_RELOAD,
  DELETE_EMPLOYEE_REQUEST,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_FAIL,
  EDIT_EMPLOYEE_REQUEST,
  EDIT_EMPLOYEE_SUCCESS,
  EDIT_EMPLOYEE_FAIL
} from 'src/constants/userConstant';
import { GET_CUSTOMER_BY_USERNAME_URL, GET_EMPLOYEE_BY_USERNAME_URL, GET_EMPLOYEE_LIST_URL, LOGIN_URL, POST_NEW_EMPLOYEE } from 'src/services/Config';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  Accept: 'application/json, text/plain, */*',
  // Authorization:
  //   'Bearer ' +
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTExMTEyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiUXVhblRyaSIsIm5iZiI6MTYyMzA4MDI2MSwiZXhwIjoxNjIzMDgzODYxfQ.kJxGYbJzRjCCg4qy3OO0XjglTcuIOhoeY6ynmmxmwUo'
};


export const login = (username, password) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST, payload: { username, password } });
  try {
    const { data } = await Axios.post(
      LOGIN_URL,
      { username, password }
    );
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    const message =
      error.respone && error.respone.data.message
        ? error.respone.data.message
        : error.message;
    dispatch({ type: USER_LOGIN_FAIL, payload: message });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
};

export const listEmployee = (keySearch) =>
  (dispatch) => {
    dispatch({ type: EMPLOYEE_LIST_REQUEST });
    try {
      if (keySearch == undefined || keySearch == '') {
        Axios.get(
          GET_EMPLOYEE_LIST_URL
        ).then(res => {
          dispatch({ type: EMPLOYEE_LIST_SUCCESS, payload: res.data });
        })
      } else {
        const arData = [];
        Axios.get(
          GET_EMPLOYEE_BY_USERNAME_URL + keySearch
        ).then(respo => {
          arData.push(respo.data)
          console.log(arData);
          dispatch({ type: EMPLOYEE_LIST_SUCCESS, payload: arData });
        })
      }
      localStorage.setItem('keySearch', keySearch);
      console.log(data);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: EMPLOYEE_LIST_FAIL, payload: message });
    }
  };

export const createEmployee =
  (employeeModels) =>
    async (dispatch) => {
      dispatch({
        type: CREATE_EMPLOYEE_REQUEST,
        payload: { employeeModels }
      });
      try {
        const { data } = await Axios.post(
          POST_NEW_EMPLOYEE,
          employeeModels
        );
        dispatch({ type: CREATE_EMPLOYEE_SUCCESS, payload: data });
      } catch (error) {
        dispatch({
          type: CREATE_EMPLOYEE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
      }
    };

export const triggerReload = () => async (dispatch) => {
  dispatch({
    type: TRIGGER_RELOAD,
    payload: {}
  });
};

export const deleteEmployee = (taiKhoan) => async (dispatch) => {
  dispatch({
    type: DELETE_EMPLOYEE_REQUEST,
    payload: { taiKhoan }
  });
  try {
    const { data } = await Axios.delete(
      `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`,
      { headers: headers }
    );
    dispatch({ type: DELETE_EMPLOYEE_SUCCESS, payload: data });
    console.log(data);
  } catch (error) {
    dispatch({
      type: DELETE_EMPLOYEE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const updateEmployee =
  (username, positon) =>
    async (dispatch) => {
      dispatch({
        type: EDIT_EMPLOYEE_REQUEST,
        payload: { username, positon }
      });

      try {
        const { data } = await Axios.put(
          
          { headers: headers }
        );
        dispatch({ type: EDIT_EMPLOYEE_SUCCESS, payload: data });
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: EDIT_EMPLOYEE_FAIL, payload: message });
      }
    };
