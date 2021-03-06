import {
 CREATE_COUPON_FAIL,
 CREATE_COUPON_REQUEST,
 CREATE_COUPON_SUCCESS,
 CREATE_SERVICE_FAIL,
 CREATE_SERVICE_REQUEST,
 CREATE_SERVICE_SUCCESS,
 CREATE_SERVICE_TYPE_FAIL,
 CREATE_SERVICE_TYPE_REQUEST,
 CREATE_SERVICE_TYPE_SUCCESS,
 DELETE_COUPON_FAIL,
 DELETE_COUPON_REQUEST,
 DELETE_COUPON_SUCCESS,
 DELETE_SERVICE_FAIL,
 DELETE_SERVICE_REQUEST,
 DELETE_SERVICE_SUCCESS,
 EDIT_COUPON_FAIL,
 EDIT_COUPON_REQUEST,
 EDIT_COUPON_SUCCESS,
 EDIT_SERVICE_FAIL,
 EDIT_SERVICE_REQUEST,
 EDIT_SERVICE_SUCCESS,
 SERVICE_LIST_FAIL,
 SERVICE_LIST_REQUEST,
 SERVICE_LIST_SUCCESS,
 SERVICE_TYPE_LIST_FAIL,
 SERVICE_TYPE_LIST_REQUEST,
 SERVICE_TYPE_LIST_SUCCESS
} from 'src/constants/serviceConstant';

export const listServiceReducer = (
 state = { loading: true, data: {} },
 action
) => {
 switch (action.type) {
  case SERVICE_LIST_REQUEST:
   return { ...state, loading: true };
  case SERVICE_LIST_SUCCESS:
   return {
    ...state,
    loading: false,
    data: action.payload
   };
  case SERVICE_LIST_FAIL:
   return { ...state, loading: false, error: action.payload };
  default:
   return state;
 }
};

export const listServiceTypeReducer = (
 state = { loading: true, types: [] },
 action
) => {
 switch (action.type) {
  case SERVICE_TYPE_LIST_REQUEST:
   return { ...state, loading: true };
  case SERVICE_TYPE_LIST_SUCCESS:
   return { ...state, loading: false, types: action.payload };
  case SERVICE_TYPE_LIST_FAIL:
   return { ...state, loading: false, error: action.payload };
  default:
   return state;
 }
};
export const createServiceReducer = (state = {}, action) => {
 switch (action.type) {
  case CREATE_SERVICE_REQUEST:
   return { ...state, loading: true };
  case CREATE_SERVICE_SUCCESS:
   return { ...state, loading: false, success: action.payload };
  case CREATE_SERVICE_FAIL:
   return { ...state, loading: false, error: action.payload };
  default:
   return state;
 }
};
export const deleteServiceReducer = (state = {}, action) => {
 switch (action.type) {
  case DELETE_SERVICE_REQUEST:
   return { ...state, loading: true };
  case DELETE_SERVICE_SUCCESS:
   return { ...state, loading: false, success: action.payload };
  case DELETE_SERVICE_FAIL:
   return { ...state, loading: false, error: action.payload };
  default:
   return state;
 }
};
export const updateServiceReducer = (state = {}, action) => {
 switch (action.type) {
  case EDIT_SERVICE_REQUEST:
   return { ...state, loading: true };
  case EDIT_SERVICE_SUCCESS:
   return { ...state, loading: false, success: action.payload };
  case EDIT_SERVICE_FAIL:
   return { ...state, loading: false, error: action.payload };
  default:
   return state;
 }
};

export const createServiceTypeReducer = (state = {}, action) => {
 switch (action.type) {
  case CREATE_SERVICE_TYPE_REQUEST:
   return { ...state, loading: true };
  case CREATE_SERVICE_TYPE_SUCCESS:
   return { ...state, loading: false, success: action.payload };
  case CREATE_SERVICE_TYPE_FAIL:
   return { ...state, loading: false, error: action.payload };
  default:
   return state;
 }
};

export const listAllServiceReducer = (
 state = { loading: true, services: {} },
 action
) => {
 switch (action.type) {
  case SERVICE_LIST_REQUEST:
   return { ...state, loading: true };
  case SERVICE_LIST_SUCCESS:
   return {
    ...state,
    loading: false,
    services: action.payload
   };
  case SERVICE_LIST_FAIL:
   return { ...state, loading: false, error: action.payload };
  default:
   return state;
 }
};

export const createCouponReducer = (state = {}, action) => {
 switch (action.type) {
  case CREATE_COUPON_REQUEST:
   return { ...state, loading: true };
  case CREATE_COUPON_SUCCESS:
   return { ...state, loading: false, success: action.payload };
  case CREATE_COUPON_FAIL:
   return { ...state, loading: false, error: action.payload };
  default:
   return state;
 }
};

//coupon
export const updateCouponReducer = (state = {}, action) => {
 switch (action.type) {
  case EDIT_COUPON_REQUEST:
   return { ...state, loading: true };
  case EDIT_COUPON_SUCCESS:
   return { ...state, loading: false, success: action.payload };
  case EDIT_COUPON_FAIL:
   return { ...state, loading: false, error: action.payload };
  default:
   return state;
 }
};
export const deleteCouponReducer = (state = {}, action) => {
 switch (action.type) {
  case DELETE_COUPON_REQUEST:
   return { ...state, loading: true };
  case DELETE_COUPON_SUCCESS:
   return { ...state, loading: false, success: action.payload };
  case DELETE_COUPON_FAIL:
   return { ...state, loading: false, error: action.payload };
  default:
   return state;
 }
};
