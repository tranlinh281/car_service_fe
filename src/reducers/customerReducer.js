import {
 CUSTOMER_LIST_FAIL,
 CUSTOMER_LIST_REQUEST,
 CUSTOMER_LIST_SUCCESS
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
