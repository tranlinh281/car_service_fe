import {
 ORDER_LIST_FAIL,
 ORDER_LIST_REQUEST,
 ORDER_LIST_SUCCESS
} from 'src/constants/orderConstant';

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
