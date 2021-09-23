import {
 ORDER_LIST_FAIL,
 ORDER_LIST_REQUEST,
 ORDER_LIST_SUCCESS,
 ORDER_PAYMENT_FAIL,
 ORDER_PAYMENT_REQUEST,
 ORDER_PAYMENT_SUCCESS,
 ORDER_STATUS_ID_FAIL,
 ORDER_STATUS_ID_REQUEST,
 ORDER_STATUS_ID_RESET,
 ORDER_STATUS_ID_SUCCESS,
 ORDER_STATUS_LIST_FAIL,
 ORDER_STATUS_LIST_REQUEST,
 ORDER_STATUS_LIST_SUCCESS
} from 'src/constants/orderConstant';

export const listOrderStatusReducer = (
 state = { loading: true, orders: [] },
 action
) => {
 switch (action.type) {
  case ORDER_STATUS_LIST_REQUEST:
   return { ...state, loading: true };
  case ORDER_STATUS_LIST_SUCCESS:
   return { ...state, loading: false, orders: action.payload };
  case ORDER_STATUS_LIST_FAIL:
   return { ...state, loading: false, error: action.payload };
  default:
   return state;
 }
};
export const listOrderByIDReducer = (
 state = { loading: true, order: null },
 action
) => {
 switch (action.type) {
  case ORDER_STATUS_ID_REQUEST:
   return { ...state, loading: true };
  case ORDER_STATUS_ID_SUCCESS:
   return { ...state, loading: false, order: action.payload };
  case ORDER_STATUS_ID_FAIL:
   return { ...state, loading: false, error: action.payload };
  case ORDER_STATUS_ID_RESET:
   return { ...state, loading: false, order: null };
  default:
   return state;
 }
};
export const listOrderReducer = (
 state = { loading: true, orders: [] },
 action
) => {
 switch (action.type) {
  case ORDER_LIST_REQUEST:
   return { ...state, loading: true };
  case ORDER_LIST_SUCCESS:
   return { ...state, loading: false, orders: action.payload };
  case ORDER_LIST_FAIL:
   return { ...state, loading: false, error: action.payload };
  default:
   return state;
 }
};

export const paymentCashReducer = (state = {}, action) => {
 switch (action.type) {
  case ORDER_PAYMENT_REQUEST:
   return { ...state, loading: true };
  case ORDER_PAYMENT_SUCCESS:
   return { ...state, loading: false, success: action.payload };
  case ORDER_PAYMENT_FAIL:
   return { ...state, loading: false, error: action.payload };
  default:
   return state;
 }
};
