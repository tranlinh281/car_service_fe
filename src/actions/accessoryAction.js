import Axios from 'axios';
import {
 ACCESSORY_LIST_FAIL,
 ACCESSORY_LIST_REQUEST,
 ACCESSORY_LIST_SUCCESS,
 ACCESSORY_TYPE_LIST_FAIL,
 ACCESSORY_TYPE_LIST_REQUEST,
 ACCESSORY_TYPE_LIST_SUCCESS,
 CREATE_ACCESSORY_FAIL,
 CREATE_ACCESSORY_REQUEST,
 CREATE_ACCESSORY_SUCCESS,
 CREATE_ACCESSORY_TYPE_FAIL,
 CREATE_ACCESSORY_TYPE_REQUEST,
 CREATE_ACCESSORY_TYPE_SUCCESS,
 DELETE_ACCESSORY_FAIL,
 DELETE_ACCESSORY_REQUEST,
 DELETE_ACCESSORY_SUCCESS,
 EDIT_ACCESSORY_FAIL,
 EDIT_ACCESSORY_REQUEST,
 EDIT_ACCESSORY_SUCCESS
} from 'src/constants/accessoryConstant';
import {
 DELETE_ACCESSORY,
 getAccessoryPagingURL,
 GET_ACCESSORY_BY_USERNAME_URL,
 GET_ACCESSORY_LIST_URL,
 GET_ACCESSORY_TYPE_LIST_BY_USERNAME_URL,
 GET_ACCESSORY_TYPE_LIST_URL,
 POST_NEW_ACCESSORY,
 POST_NEW_ACCESSORY_TYPE,
 UPDATE_ACCESSORY_URL
} from 'src/services/Config';
import { triggerReload } from './userAction';
const headers = {
 'Content-Type': 'application/json',
 'Access-Control-Allow-Origin': '*',
 Accept: 'application/json, text/plain, */*'
 // Authorization:
 //   'Bearer ' +
 //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTExMTEyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiUXVhblRyaSIsIm5iZiI6MTYyMzA4MDI2MSwiZXhwIjoxNjIzMDgzODYxfQ.kJxGYbJzRjCCg4qy3OO0XjglTcuIOhoeY6ynmmxmwUo'
};

export const listAccessory = (keySearch, page) => async (dispatch) => {
 dispatch({ type: ACCESSORY_LIST_REQUEST });
 try {
  if (keySearch == undefined || keySearch == '') {
   await Axios.get(getAccessoryPagingURL(page)).then((res) => {
    dispatch({ type: ACCESSORY_LIST_SUCCESS, payload: res.data });
   });
  } else {
   // const arData = [];
   await Axios.get(getAccessoryPagingURL(page) + keySearch).then((respo) => {
    console.log(respo.data, 'action debug accesory');
    dispatch({ type: ACCESSORY_LIST_SUCCESS, payload: respo.data });
   });
  }
  localStorage.setItem('keySearch', keySearch);
  console.log(data);
 } catch (error) {
  const message =
   error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
  dispatch({ type: ACCESSORY_LIST_FAIL, payload: message });
 }
};

export const createAccessory = (accessoryModels) => async (dispatch) => {
 dispatch({
  type: CREATE_ACCESSORY_REQUEST,
  payload: { accessoryModels }
 });
 try {
  const { data } = await Axios.post(POST_NEW_ACCESSORY, accessoryModels);
  dispatch({ type: CREATE_ACCESSORY_SUCCESS, payload: data });
 } catch (error) {
  dispatch({
   type: CREATE_ACCESSORY_FAIL,
   payload:
    error.response && error.response.data.message
     ? error.response.data.message
     : error.message
  });
 }
};
export const deleteAccessory = (accessoryId) => async (dispatch) => {
 dispatch({
  type: DELETE_ACCESSORY_REQUEST,
  payload: { accessoryId }
 });
 try {
  const { data } = await Axios.delete(DELETE_ACCESSORY + accessoryId, {
   headers: headers
  });
  dispatch({ type: DELETE_ACCESSORY_SUCCESS, payload: data });
 } catch (error) {
  dispatch({
   type: DELETE_ACCESSORY_FAIL,
   payload:
    error.response && error.response.data.message
     ? error.response.data.message
     : error.message
  });
 }
};

export const updateAccessory = (accessoryModels) => async (dispatch) => {
 dispatch({
  type: EDIT_ACCESSORY_REQUEST,
  payload: { accessoryModels }
 });

 try {
  const { data } = await Axios.put(UPDATE_ACCESSORY_URL, accessoryModels);
  dispatch({ type: EDIT_ACCESSORY_SUCCESS, payload: data });
  dispatch(triggerReload({}));
 } catch (error) {
  const message =
   error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
  dispatch({ type: EDIT_ACCESSORY_FAIL, payload: message });
 }
};

export const listTypeAccessory = (keySearch) => async (dispatch) => {
 dispatch({ type: ACCESSORY_TYPE_LIST_REQUEST });
 try {
  if (keySearch == undefined || keySearch == '') {
   await Axios.get(GET_ACCESSORY_TYPE_LIST_URL).then((res) => {
    dispatch({ type: ACCESSORY_TYPE_LIST_SUCCESS, payload: res.data });
   });
  } else {
   // const arData = [];
   await Axios.get(GET_ACCESSORY_TYPE_LIST_BY_USERNAME_URL + keySearch).then(
    (respo) => {
     // arData.push(respo.data)
     // console.log(arData);
     dispatch({ type: ACCESSORY_TYPE_LIST_SUCCESS, payload: respo.data });
    }
   );
  }
  localStorage.setItem('keySearch', keySearch);
  console.log(data);
 } catch (error) {
  const message =
   error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
  dispatch({ type: ACCESSORY_TYPE_LIST_FAIL, payload: message });
 }
};

export const createTypeAccessory = (name) => async (dispatch) => {
 dispatch({
  type: CREATE_ACCESSORY_TYPE_REQUEST,
  payload: { name }
 });
 try {
  const { data } = await Axios.post(POST_NEW_ACCESSORY_TYPE + name);
  dispatch({ type: CREATE_ACCESSORY_TYPE_SUCCESS, payload: data });
 } catch (error) {
  dispatch({
   type: CREATE_ACCESSORY_TYPE_FAIL,
   payload:
    error.response && error.response.data.message
     ? error.response.data.message
     : error.message
  });
 }
};
