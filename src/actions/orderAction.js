import Axios from 'axios';
import { useState } from 'react';
import {
 ORDER_LIST_FAIL,
 ORDER_LIST_REQUEST,
 ORDER_LIST_SUCCESS
} from 'src/constants/orderConstant';
import { GET_ORDER_LIST_URL } from 'src/services/Config';
import { triggerReload } from './userAction';
const headers = {
 'Content-Type': 'application/json',
 'Access-Control-Allow-Origin': '*',
 Accept: 'application/json, text/plain, */*'
 // Authorization:
 //   'Bearer ' +
 //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTExMTEyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiUXVhblRyaSIsIm5iZiI6MTYyMzA4MDI2MSwiZXhwIjoxNjIzMDgzODYxfQ.kJxGYbJzRjCCg4qy3OO0XjglTcuIOhoeY6ynmmxmwUo'
};

export const listAllOrder = () => async (dispatch) => {
 dispatch({ type: ORDER_LIST_REQUEST });
 try {
  const { data } = await Axios.get(GET_ORDER_LIST_URL);

  const arrayStatus = data?.map((order) => ({
   stat: order.status,
   dateTime: new Date(order.bookingTime).getDate()
  }));

  const processingDate = arrayStatus.reduce(
   (total, x) =>
    x.stat === 'Đang tiến hành' && x.dateTime ? total + 1 : total,
   0
  );
  const processingAll = arrayStatus.reduce(
   (total, x) => (x.stat === 'Đang tiến hành' ? total + 1 : total),
   0
  );
  const allOrder = arrayStatus.reduce((total, x) => (x ? total + 1 : total), 0);

  const accept = arrayStatus.reduce(
   (total, x) =>
    x.stat === 'Đã nhận xe' && x.dateTime === new Date().getDate()
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

  const dataCount = {
   accept,
   processingDate,
   processingAll,
   done,
   dateTimeCount,
   doneAll,
   allOrder,
   cancelDay
  };

  dispatch({ type: ORDER_LIST_SUCCESS, payload: dataCount });
 } catch (error) {
  const message =
   error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
  dispatch({ type: ORDER_LIST_FAIL, payload: message });
 }
};
