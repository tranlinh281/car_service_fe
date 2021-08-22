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

export const listCustomerReducer = (
 state = { loading: true, data: {} },
 action
) => {
 switch (action.type) {
  case CUSTOMER_LIST_REQUEST:
   return { ...state, loading: true };
  case CUSTOMER_LIST_SUCCESS:
   return {
    ...state,
    loading: false,
    data: action.payload
   };
  case CUSTOMER_LIST_FAIL:
   return { ...state, loading: false, error: action.payload };
  default:
   return state;
 }
};

export const banCustomerReducer = (state = {}, action) => {
 switch (action.type) {
  case CUSTOMER_BAN_REQUEST:
   return { ...state, loading: true };
  case CUSTOMER_BAN_SUCCESS:
   return { ...state, loading: false, success: action.payload };
  case CUSTOMER_BAN_FAIL:
   return { ...state, loading: false, error: action.payload };
  default:
   return state;
 }
};

export const customerNotificationReducer = (state = {}, action) => {
 switch (action.type) {
  case CUSTOMER_NOTIFICATION_REQUEST:
   return { ...state, loading: true };
  case CUSTOMER_NOTIFICATION_SUCCESS:
   return { ...state, loading: false, success: action.payload };
  case CUSTOMER_NOTIFICATION_FAIL:
   return { ...state, loading: false, error: action.payload };
  default:
   return state;
 }
};
