import {
 TRANSACTION_ALL_LIST_FAIL,
 TRANSACTION_ALL_LIST_REQUEST,
 TRANSACTION_ALL_LIST_SUCCESS,
 TRANSACTION_LIST_FAIL,
 TRANSACTION_LIST_REQUEST,
 TRANSACTION_LIST_SUCCESS
} from 'src/constants/transactionConstant';

export const listTransactionReducer = (
 state = { loading: true, data: [] },
 action
) => {
 switch (action.type) {
  case TRANSACTION_LIST_REQUEST:
   return { ...state, loading: true };
  case TRANSACTION_LIST_SUCCESS:
   return { ...state, loading: false, data: action.payload };
  case TRANSACTION_LIST_FAIL:
   return { ...state, loading: false, error: action.payload };
  default:
   return state;
 }
};
export const listAllTransactionReducer = (
 state = { loading: true, data: [] },
 action
) => {
 switch (action.type) {
  case TRANSACTION_ALL_LIST_REQUEST:
   return { ...state, loading: true };
  case TRANSACTION_ALL_LIST_SUCCESS:
   return { ...state, loading: false, data: action.payload };
  case TRANSACTION_ALL_LIST_FAIL:
   return { ...state, loading: false, error: action.payload };
  default:
   return state;
 }
};
