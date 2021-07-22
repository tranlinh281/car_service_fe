import {
 CREATE_MANUFACTURER_FAIL,
 CREATE_MANUFACTURER_REQUEST,
 CREATE_MANUFACTURER_SUCCESS,
 MANUFACTURER_LIST_ALL_FAIL,
 MANUFACTURER_LIST_ALL_REQUEST,
 MANUFACTURER_LIST_ALL_SUCCESS,
 MANUFACTURER_LIST_FAIL,
 MANUFACTURER_LIST_REQUEST,
 MANUFACTURER_LIST_SUCCESS
} from 'src/constants/ManufacturerConstant';
import {
 getManufacturerPagingURL,
 GET_MANUFACTURER_BY_NAME_URL,
 GET_MANUFACTURER_LIST_URL,
 POST_NEW_MANUFACTURER
} from 'src/services/Config';
import Axios from 'axios';

const headers = {
 'Content-Type': 'application/json',
 'Access-Control-Allow-Origin': '*',
 Accept: 'application/json, text/plain, */*'
 // Authorization:
 //   'Bearer ' +
 //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTExMTEyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiUXVhblRyaSIsIm5iZiI6MTYyMzA4MDI2MSwiZXhwIjoxNjIzMDgzODYxfQ.kJxGYbJzRjCCg4qy3OO0XjglTcuIOhoeY6ynmmxmwUo'
};

export const listManufacturer = (keySearch, page) => async (dispatch) => {
 dispatch({ type: MANUFACTURER_LIST_REQUEST });
 try {
  if (keySearch == undefined || keySearch == '') {
   const { data } = await Axios.get(getManufacturerPagingURL(page));
   dispatch({ type: MANUFACTURER_LIST_SUCCESS, payload: data });
   dispatch({ type: MANUFACTURER_LIST_FAIL, payload: '' });
  } else {
   const { data } = await Axios.get(getManufacturerPagingURL(page) + keySearch);
   dispatch({ type: MANUFACTURER_LIST_SUCCESS, payload: data });
  }
  console.log(keySearch, 'debug action');
 } catch (error) {
  const message =
   error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
  dispatch({ type: MANUFACTURER_LIST_FAIL, payload: message });
 }
};

export const listAllManufacturer = () => async (dispatch) => {
 dispatch({ type: MANUFACTURER_LIST_ALL_REQUEST });
 try {
  const { data } = await Axios.get(GET_MANUFACTURER_LIST_URL);
  dispatch({ type: MANUFACTURER_LIST_ALL_SUCCESS, payload: data });
  console.log(data, 'debug action');
 } catch (error) {
  const message =
   error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
  dispatch({ type: MANUFACTURER_LIST_ALL_FAIL, payload: message });
 }
};

export const createManufacturer = (name) => async (dispatch) => {
 dispatch({
  type: CREATE_MANUFACTURER_REQUEST,
  payload: { name }
 });
 try {
  const { data } = await Axios.post(POST_NEW_MANUFACTURER + name);
  dispatch({ type: CREATE_MANUFACTURER_SUCCESS, payload: data });
 } catch (error) {
  dispatch({
   type: CREATE_MANUFACTURER_FAIL,
   payload:
    error.response && error.response.data.message
     ? error.response.data.message
     : error.message
  });
 }
};
