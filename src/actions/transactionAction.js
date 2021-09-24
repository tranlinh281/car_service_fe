import Axios from 'axios';
import moment from 'moment';
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

export const listAllDayTransaction = () => async (dispatch) => {
 dispatch({ type: TRANSACTION_ALL_LIST_REQUEST });
 try {
  const { data } = await Axios.get(GET_ORDER_PAYMENT_LIST_URL);
  console.log(data, 'debug data action transaction');
  const arrayDate = data?.map((order) => ({
   total: order.total,
   count: order.count,
   dateTime: new Date(order.date).getDate()
  }));
  const arrayMonth = data?.map((order) => ({
   total: order.total,
   dateTime: new Date(order.date).getMonth()
  }));
  const totalThisMonth = arrayMonth.reduce(
   (total, x) =>
    x.dateTime === new Date().getMonth() ? total + x.total : total,
   0
  );
  const totalCountDate = arrayDate.reduce(
   (total, x) =>
    x.dateTime === new Date().getDate() ? total + x.count : total,
   0
  );

  const totalMonth = arrayMonth.reduce(
   (total, x) => (x.dateTime === 0 ? total + x.total : total),
   0
  );

  const totalMonth1 = arrayMonth.reduce(
   (total, x) => (x.dateTime === 1 ? total + x.total : total),
   0
  );
  const totalMonth2 = arrayMonth.reduce(
   (total, x) => (x.dateTime === 2 ? total + x.total : total),
   0
  );
  const totalMonth3 = arrayMonth.reduce(
   (total, x) => (x.dateTime === 3 ? total + x.total : total),
   0
  );
  const totalMonth4 = arrayMonth.reduce(
   (total, x) => (x.dateTime === 4 ? total + x.total : total),
   0
  );
  const totalMonth5 = arrayMonth.reduce(
   (total, x) => (x.dateTime === 5 ? total + x.total : total),
   0
  );
  const totalMonth6 = arrayMonth.reduce(
   (total, x) => (x.dateTime === 6 ? total + x.total : total),
   0
  );
  const totalMonth7 = arrayMonth.reduce(
   (total, x) => (x.dateTime === 7 ? total + x.total : total),
   0
  );

  const totalMonth8 = arrayMonth.reduce(
   (total, x) => (x.dateTime === 8 ? total + x.total : total),
   0
  );
  const totalMonth9 = arrayMonth.reduce(
   (total, x) => (x.dateTime === 9 ? total + x.total : total),
   0
  );
  const totalMonth10 = arrayMonth.reduce(
   (total, x) => (x.dateTime === 10 ? total + x.total : total),
   0
  );
  const totalMonth11 = arrayMonth.reduce(
   (total, x) => (x.dateTime === 11 ? total + x.total : total),
   0
  );

  const totalToday = arrayDate.reduce(
   (total, x) =>
    x.dateTime === new Date().getDate() ? total + x.total : total,
   0
  );
  const totalToPre = arrayDate.reduce(
   (total, x) =>
    x.dateTime === new Date().getDate() - 1 ? total + x.total : total,
   0
  );
  const totalToPre1 = arrayDate.reduce(
   (total, x) =>
    x.dateTime === new Date().getDate() - 2 ? total + x.total : total,
   0
  );
  const totalToPre2 = arrayDate.reduce(
   (total, x) =>
    x.dateTime === new Date().getDate() - 3 ? total + x.total : total,
   0
  );
  const totalToPre3 = arrayDate.reduce(
   (total, x) =>
    x.dateTime === new Date().getDate() - 4 ? total + x.total : total,
   0
  );
  const totalToPre4 = arrayDate.reduce(
   (total, x) =>
    x.dateTime === new Date().getDate() - 5 ? total + x.total : total,
   0
  );
  const totalToPre5 = arrayDate.reduce(
   (total, x) =>
    x.dateTime === new Date().getDate() - 6 ? total + x.total : total,
   0
  );

  const lineChartMonth = [
   totalMonth,
   totalMonth1,
   totalMonth2,
   totalMonth3,
   totalMonth4,
   totalMonth5,
   totalMonth6,
   totalMonth7,
   totalMonth8,
   totalMonth9,
   totalMonth10,
   totalMonth11
  ];
  const lineChartDate = [
   totalToPre5,
   totalToPre4,
   totalToPre3,
   totalToPre2,
   totalToPre1,
   totalToPre,
   totalToday
  ];
  console.log(lineChartMonth, 'debug array month');

  const dataCount = {
   lineChartDate,
   lineChartMonth,
   totalToday,
   totalThisMonth,
   totalCountDate
  };
  console.log(dataCount, 'debug array');
  dispatch({ type: TRANSACTION_ALL_LIST_SUCCESS, payload: dataCount });
 } catch (error) {
  const message =
   error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
  dispatch({ type: TRANSACTION_ALL_LIST_FAIL, payload: message });
 }
};
