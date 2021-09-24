import Axios from 'axios';
import {
 ORDER_LIST_FAIL,
 ORDER_LIST_REQUEST,
 ORDER_LIST_SUCCESS,
 ORDER_PAYMENT_FAIL,
 ORDER_PAYMENT_REQUEST,
 ORDER_PAYMENT_SUCCESS,
 ORDER_STATUS_ID_FAIL,
 ORDER_STATUS_ID_REQUEST,
 ORDER_STATUS_ID_SUCCESS,
 ORDER_STATUS_LIST_FAIL,
 ORDER_STATUS_LIST_REQUEST,
 ORDER_STATUS_LIST_SUCCESS
} from 'src/constants/orderConstant';
import {
 getOrderPagingURL,
 GET_ORDER_LIST_BY_ID,
 GET_ORDER_LIST_URL,
 PAYMENT_CASH_BY_ADMIN
} from 'src/services/Config';

export const listAllOrderWithStatus = (page, keyword) => async (dispatch) => {
 dispatch({ type: ORDER_STATUS_LIST_REQUEST });
 try {
  const { data } = await Axios.get(getOrderPagingURL(page) + keyword);
  dispatch({ type: ORDER_STATUS_LIST_SUCCESS, payload: data });
 } catch (error) {
  const message =
   error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
  dispatch({ type: ORDER_STATUS_LIST_FAIL, payload: message });
 }
};

export const listAllOrderWithID = (id) => async (dispatch) => {
 dispatch({ type: ORDER_STATUS_ID_REQUEST });
 try {
  const { data } = await Axios.get(GET_ORDER_LIST_BY_ID + id);
  dispatch({ type: ORDER_STATUS_ID_SUCCESS, payload: data });
 } catch (error) {
  const message =
   error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
  dispatch({ type: ORDER_STATUS_ID_FAIL, payload: message });
 }
};

export const listAllOrder = () => async (dispatch) => {
 dispatch({ type: ORDER_LIST_REQUEST });
 try {
  const { data } = await Axios.get(GET_ORDER_LIST_URL);
  const arrayStatus = data?.map((order) => ({
   stat: order.status,
   dateTime: new Date(order.bookingTime).getDate()
  }));
  console.log(data, 'debug array status');

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

export const paymentCashByAdmin = (dataNew) => async (dispatch) => {
 dispatch({
  type: ORDER_PAYMENT_REQUEST
 });

 try {
  const { data } = await Axios.put(PAYMENT_CASH_BY_ADMIN, dataNew);

  dispatch({ type: ORDER_PAYMENT_SUCCESS, payload: true });

  dispatch(triggerReload({}));
 } catch (error) {
  const message =
   error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
  dispatch({ type: ORDER_PAYMENT_FAIL, payload: message });
 }
};
