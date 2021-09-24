import Axios from 'axios';
import {
 DELETE_PACKAGE,
 getPackagePagingURL,
 GET_PACKAGE_BY_ID,
 GET_PACKAGE_CONTENT,
 GET_PACKAGE_LIST_URL,
 POST_NEW_PACKAGE,
 UPDATE_PACKAGE_URL
} from './../services/Config';
import {
 CREATE_PACKAGE_SUCCESS,
 CREATE_PACKAGE_REQUEST,
 CREATE_PACKAGE_FAIL,
 PACKAGE_LIST_FAIL,
 PACKAGE_LIST_REQUEST,
 PACKAGE_LIST_SUCCESS,
 DELETE_PACKAGE_REQUEST,
 DELETE_PACKAGE_SUCCESS,
 DELETE_PACKAGE_FAIL,
 EDIT_PACKAGE_REQUEST,
 EDIT_PACKAGE_FAIL,
 EDIT_PACKAGE_SUCCESS,
 PACKAGE_ID_REQUEST,
 PACKAGE_ID_SUCCESS,
 PACKAGE_ID_FAIL
} from 'src/constants/packageConstant';

const headers = {
 'Content-Type': 'application/json',
 'Access-Control-Allow-Origin': '*',
 Accept: 'application/json, text/plain, */*'
 // Authorization:
 //   'Bearer ' +
 //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTExMTEyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiUXVhblRyaSIsIm5iZiI6MTYyMzA4MDI2MSwiZXhwIjoxNjIzMDgzODYxfQ.kJxGYbJzRjCCg4qy3OO0XjglTcuIOhoeY6ynmmxmwUo'
};

export const listPackage = (keySearch, page) => async (dispatch) => {
 dispatch({ type: PACKAGE_LIST_REQUEST });
 try {
  if (keySearch == undefined || keySearch == '') {
   const { data } = await Axios.get(getPackagePagingURL(page));
   dispatch({ type: PACKAGE_LIST_SUCCESS, payload: data });
  } else {
   const { data } = await Axios.get(getPackagePagingURL(page) + keySearch);
   dispatch({ type: PACKAGE_LIST_SUCCESS, payload: data });
  }

 } catch (error) {
  const message =
   error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
  dispatch({ type: PACKAGE_LIST_FAIL, payload: message });
 }
};

export const createPackage = (mappedData) => async (dispatch) => {
 dispatch({
  type: CREATE_PACKAGE_REQUEST,
  payload: { mappedData }
 });
 try {
  const { data } = await Axios.post(POST_NEW_PACKAGE, mappedData);
  dispatch({ type: CREATE_PACKAGE_SUCCESS, payload: data });
  dispatch(triggerReload({}));
 } catch (error) {
  dispatch({
   type: CREATE_PACKAGE_FAIL,
   payload:
    error.response && error.response.data.message
     ? error.response.data.message
     : error.message
  });
 }
};
export const deletePackage = (id) => async (dispatch) => {
 dispatch({
  type: DELETE_PACKAGE_REQUEST,
  payload: { id }
 });
 try {
  const { data } = await Axios.delete(DELETE_PACKAGE + id, {
   headers: headers
  });
  dispatch({ type: DELETE_PACKAGE_SUCCESS, payload: data });

 } catch (error) {
  dispatch({
   type: DELETE_PACKAGE_FAIL,
   payload:
    error.response && error.response.data.message
     ? error.response.data.message
     : error.message
  });
 }
};

export const updatePackage = (packageModels) => async (dispatch) => {
 dispatch({
  type: EDIT_PACKAGE_REQUEST,
  payload: { packageModels }
 });

 try {
  const { data } = await Axios.put(UPDATE_PACKAGE_URL, packageModels);
  dispatch({ type: EDIT_PACKAGE_SUCCESS, payload: data });
  dispatch(triggerReload({}));
 } catch (error) {
  const message =
   error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
  dispatch({ type: EDIT_PACKAGE_FAIL, payload: message });
 }
};

export const PackageID = (id) => async (dispatch) => {
 dispatch({ type: PACKAGE_ID_REQUEST });
 try {
  const { data } = await Axios.get(GET_PACKAGE_BY_ID + id);
  dispatch({ type: PACKAGE_ID_SUCCESS, payload: data });


 } catch (error) {
  const message =
   error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
  dispatch({ type: PACKAGE_ID_FAIL, payload: message });
 }
};
