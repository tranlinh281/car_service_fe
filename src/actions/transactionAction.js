import Axios from 'axios';
import {
 TRANSACTION_LIST_FAIL,
 TRANSACTION_LIST_REQUEST,
 TRANSACTION_LIST_SUCCESS
} from 'src/constants/transactionConstant';

import { getTransactionPagingURL } from 'src/services/Config';
const headers = {
 'Content-Type': 'application/json',
 'Access-Control-Allow-Origin': '*',
 Accept: 'application/json, text/plain, */*'
 // Authorization:
 //   'Bearer ' +
 //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTExMTEyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiUXVhblRyaSIsIm5iZiI6MTYyMzA4MDI2MSwiZXhwIjoxNjIzMDgzODYxfQ.kJxGYbJzRjCCg4qy3OO0XjglTcuIOhoeY6ynmmxmwUo'
};

export const listTransaction = (keySearch, page) => async (dispatch) => {
 dispatch({ type: TRANSACTION_LIST_REQUEST });
 try {
  if (keySearch == undefined || keySearch == '') {
   await Axios.get(getTransactionPagingURL(page)).then((res) => {
    dispatch({ type: TRANSACTION_LIST_SUCCESS, payload: res.data });
   });
   console.log(res.data, 'debug action');
   console.log(getTransactionPagingURL, 'debug config');
  } else {
   await Axios.get(getTransactionPagingURL(page) + keySearch).then((respo) => {
    dispatch({ type: TRANSACTION_LIST_SUCCESS, payload: respo.data });
   });
  }
  localStorage.setItem('keySearch', keySearch);
 } catch (error) {
  const message =
   error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
  dispatch({ type: TRANSACTION_LIST_FAIL, payload: message });
 }
};
