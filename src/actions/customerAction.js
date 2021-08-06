import Axios from 'axios';
import {
 CUSTOMER_BAN_FAIL,
 CUSTOMER_BAN_REQUEST,
 CUSTOMER_BAN_SUCCESS,
 CUSTOMER_LIST_FAIL,
 CUSTOMER_LIST_REQUEST,
 CUSTOMER_LIST_SUCCESS
} from 'src/constants/customerConstant';
import { getCustomerPagingURL } from 'src/services/Config';
const headers = {
 'Content-Type': 'application/json',
 'Access-Control-Allow-Origin': '*',
 Accept: 'application/json, text/plain, */*'
 // Authorization:
 //   'Bearer ' +
 //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTExMTEyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiUXVhblRyaSIsIm5iZiI6MTYyMzA4MDI2MSwiZXhwIjoxNjIzMDgzODYxfQ.kJxGYbJzRjCCg4qy3OO0XjglTcuIOhoeY6ynmmxmwUo'
};

export const listCustomer = (keySearch, page) => async (dispatch) => {
 dispatch({ type: CUSTOMER_LIST_REQUEST });
 try {
  if (keySearch == undefined || keySearch == '') {
   await Axios.get(getCustomerPagingURL(page)).then((res) => {
    dispatch({ type: CUSTOMER_LIST_SUCCESS, payload: res.data });
   });
  } else {
   await Axios.get(getCustomerPagingURL(page) + keySearch).then((respo) => {
    dispatch({ type: CUSTOMER_LIST_SUCCESS, payload: respo.data });
   });
  }
  localStorage.setItem('keySearch', keySearch);
 } catch (error) {
  const message =
   error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
  dispatch({ type: CUSTOMER_LIST_FAIL, payload: message });
 }
};
export const banCustomer = (isBanned, username) => async (dispatch) => {
 dispatch({ type: CUSTOMER_BAN_REQUEST });
 try {
  await Axios.put(banCustomer(username) + isBanned).then((respo) => {
   dispatch({ type: CUSTOMER_BAN_SUCCESS, payload: respo.data });
  });
 } catch (error) {
  const message =
   error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
  dispatch({ type: CUSTOMER_BAN_FAIL, payload: message });
 }
};
