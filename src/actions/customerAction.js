import Axios from 'axios';
import {
 CUSTOMER_BAN_FAIL,
 CUSTOMER_BAN_REQUEST,
 CUSTOMER_BAN_SUCCESS,
 CUSTOMER_LIST_FAIL,
 CUSTOMER_LIST_REQUEST,
 CUSTOMER_LIST_SUCCESS,
 CUSTOMER_NOTIFICATION_FAIL,
 CUSTOMER_NOTIFICATION_REQUEST,
 CUSTOMER_NOTIFICATION_SUCCESS
} from 'src/constants/customerConstant';
import {
 banCustomer,
 CUSTOMER_NOTIFICATION,
 getCustomerPagingURL
} from 'src/services/Config';
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
export const banCust = (username, isBanned) => async (dispatch) => {
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

export const createNotification = (notification) => async (dispatch) => {
 dispatch({
  type: CUSTOMER_NOTIFICATION_REQUEST,
  payload: { notification }
 });

 try {
  const { data } = await Axios.post(CUSTOMER_NOTIFICATION, notification);
  dispatch({ type: CUSTOMER_NOTIFICATION_SUCCESS, payload: data });
  console.log(response.status, 'debug action');
 } catch (error) {
  dispatch({
   type: CUSTOMER_NOTIFICATION_FAIL,
   payload:
    error.response && error.response.data.message
     ? error.response.data.message
     : error.message
  });
 }
};
