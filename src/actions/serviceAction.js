import Axios from 'axios';
import {
 CREATE_SERVICE_FAIL,
 CREATE_SERVICE_REQUEST,
 CREATE_SERVICE_SUCCESS,
 CREATE_SERVICE_TYPE_FAIL,
 CREATE_SERVICE_TYPE_REQUEST,
 CREATE_SERVICE_TYPE_SUCCESS,
 DELETE_SERVICE_FAIL,
 DELETE_SERVICE_REQUEST,
 DELETE_SERVICE_SUCCESS,
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
import {
 getServicePagingURL,
 DELETE_SERVICE,
 GET_SERVICE_TYPE_LIST_URL,
 POST_NEW_SERVICE,
 POST_NEW_SERVICE_TYPE,
 UPDATE_SERVICE_URL,
 GET_SERVICE_LIST_URL,
 GET_TYPE_LIST_URL
} from 'src/services/Config';
const headers = {
 'Content-Type': 'application/json',
 'Access-Control-Allow-Origin': '*',
 Accept: 'application/json, text/plain, */*'
 // Authorization:
 //   'Bearer ' +
 //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTExMTEyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiUXVhblRyaSIsIm5iZiI6MTYyMzA4MDI2MSwiZXhwIjoxNjIzMDgzODYxfQ.kJxGYbJzRjCCg4qy3OO0XjglTcuIOhoeY6ynmmxmwUo'
};

export const listService = (keySearch, page) => async (dispatch) => {
 dispatch({ type: SERVICE_LIST_REQUEST });
 try {
  if (keySearch == undefined || keySearch == '') {
   const { data } = await Axios.get(getServicePagingURL(page));
   dispatch({ type: SERVICE_LIST_SUCCESS, payload: data });
   dispatch({ type: SERVICE_LIST_FAIL, payload: '' });
  } else {
   const { data } = await Axios.get(getServicePagingURL(page) + keySearch);
   dispatch({ type: SERVICE_LIST_SUCCESS, payload: data });
  }
 } catch (error) {
  const message =
   error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
  dispatch({ type: SERVICE_LIST_FAIL, payload: message });
 }
};
export const createService = (serviceModels) => async (dispatch) => {
 dispatch({
  type: CREATE_SERVICE_REQUEST,
  payload: { serviceModels }
 });
 try {
  const { data } = await Axios.post(POST_NEW_SERVICE, serviceModels);
  dispatch({ type: CREATE_SERVICE_SUCCESS, payload: data });
 } catch (error) {
  dispatch({
   type: CREATE_SERVICE_FAIL,
   payload:
    error.response && error.response.data.message
     ? error.response.data.message
     : error.message
  });
 }
};

export const listServiceType = (keySearch) => async (dispatch) => {
 dispatch({ type: SERVICE_TYPE_LIST_REQUEST });
 try {
  if (keySearch == undefined || keySearch == '') {
   await Axios.get(GET_TYPE_LIST_URL).then((res) => {
    dispatch({ type: SERVICE_TYPE_LIST_SUCCESS, payload: res.data });
   });
  } else {
   await Axios.get(GET_TYPE_LIST_URL + keySearch).then((respo) => {
    dispatch({ type: SERVICE_TYPE_LIST_SUCCESS, payload: respo.data });
   });
  }
  localStorage.setItem('keySearch', keySearch);
  console.log(data);
 } catch (error) {
  const message =
   error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
  dispatch({ type: SERVICE_TYPE_LIST_FAIL, payload: message });
 }
};
export const deleteService = (serviceId) => async (dispatch) => {
 dispatch({
  type: DELETE_SERVICE_REQUEST,
  payload: { serviceId }
 });
 try {
  const { data } = await Axios.delete(DELETE_SERVICE + serviceId, {
   headers: headers
  });
  dispatch({ type: DELETE_SERVICE_SUCCESS, payload: data });
 } catch (error) {
  dispatch({
   type: DELETE_SERVICE_FAIL,
   payload:
    error.response && error.response.data.message
     ? error.response.data.message
     : error.message
  });
 }
};

export const updateService = (serviceModels) => async (dispatch) => {
 dispatch({
  type: EDIT_SERVICE_REQUEST,
  payload: { serviceModels }
 });

 try {
  const { data } = await Axios.put(UPDATE_SERVICE_URL, serviceModels);
  dispatch({ type: EDIT_SERVICE_SUCCESS, payload: data });
  dispatch(triggerReload({}));
 } catch (error) {
  const message =
   error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
  dispatch({ type: EDIT_SERVICE_FAIL, payload: message });
 }
};

export const createTypeService = (name) => async (dispatch) => {
 dispatch({
  type: CREATE_SERVICE_TYPE_REQUEST,
  payload: { name }
 });
 try {
  const { data } = await Axios.post(POST_NEW_SERVICE_TYPE + name);
  dispatch({ type: CREATE_SERVICE_TYPE_SUCCESS, payload: data });
 } catch (error) {
  dispatch({
   type: CREATE_SERVICE_TYPE_FAIL,
   payload:
    error.response && error.response.data.message
     ? error.response.data.message
     : error.message
  });
 }
};
export const listAllService = () => async (dispatch) => {
 dispatch({ type: SERVICE_LIST_REQUEST });
 try {
  const { data } = await Axios.get(GET_SERVICE_LIST_URL);
  dispatch({ type: SERVICE_LIST_SUCCESS, payload: data });
  dispatch({ type: SERVICE_LIST_FAIL, payload: '' });
 } catch (error) {
  const message =
   error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
  dispatch({ type: SERVICE_LIST_FAIL, payload: message });
 }
};
