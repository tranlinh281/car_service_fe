import Axios from 'axios';
import {
 TRANSACTION_ALL_LIST_FAIL,
 TRANSACTION_ALL_LIST_REQUEST,
 TRANSACTION_ALL_LIST_SUCCESS,
 TRANSACTION_LIST_FAIL,
 TRANSACTION_LIST_REQUEST,
 TRANSACTION_LIST_SUCCESS
} from 'src/constants/transactionConstant';

import {
 getTransactionPagingURL,
 GET_ORDER_PAYMENT_LIST_URL
} from 'src/services/Config';
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

export const listAllTransaction = () => async (dispatch) => {
 dispatch({ type: TRANSACTION_ALL_LIST_REQUEST });
 try {
  const { data } = await Axios.get(GET_ORDER_PAYMENT_LIST_URL);

  const arrayStatus = data?.map((order) => ({
   stat: order.total,
   dateTime: new Date(order.bookingTime)
  }));
  const totalDate = arrayStatus.reduce(
   (total, x) => (x.stat === x.dateTime.getDate() ? total + 1 : total),
   0
  );
  const totalMonth = arrayStatus.reduce(
   (total, x) => (x.stat === x.dateTime.getMonth() ? total + 1 : total),
   0
  );
  const allOrder = arrayStatus.reduce((total, x) => (x ? total + 1 : total), 0);

  const accept = arrayStatus.reduce(
   (total, x) =>
    x.stat === 'Đã xác nhận' && x.dateTime === new Date().getDate()
     ? total + 1
     : total,
   0
  );
  const done = arrayStatus.reduce(
   (total, x) =>
    x.stat === 'Hoàn thành' && x.dateTime === new Date().getDate()
     ? total + 1
     : total,
   0
  );
  const doneAll = arrayStatus.reduce(
   (total, x) => (x.stat === 'Hoàn thành' ? total + 1 : total),
   0
  );
  const cancelDay = arrayStatus.reduce(
   (total, x) => (x.stat === 'Đã hủy' ? total + 1 : total),
   0
  );
  const dateTimeCount = arrayStatus.reduce(
   (total, x) => (x.dateTime === new Date().getDate() ? total + 1 : total),
   0
  );

  const dataCount = { totalDate, totalMonth };

  dispatch({ type: TRANSACTION_ALL_LIST_SUCCESS, payload: dataCount });
 } catch (error) {
  const message =
   error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
  dispatch({ type: TRANSACTION_ALL_LIST_FAIL, payload: message });
 }
};
