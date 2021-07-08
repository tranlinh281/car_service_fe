import {
 MANUFACTURER_LIST_FAIL,
 MANUFACTURER_LIST_REQUEST,
 MANUFACTURER_LIST_SUCCESS
} from 'src/constants/ManufacturerConstant';
import {
 GET_MANUFACTURER_BY_NAME_URL,
 GET_MANUFACTURER_LIST_URL
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

export const listManufacturer = () => async (dispatch) => {
 dispatch({ type: MANUFACTURER_LIST_REQUEST });
 try {
  await Axios.get(GET_MANUFACTURER_LIST_URL).then((res) => {
   dispatch({ type: MANUFACTURER_LIST_SUCCESS, payload: res.data });
  }); 
 } catch (error) {
  const message =
   error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
  dispatch({ type: MANUFACTURER_LIST_FAIL, payload: message });
 }
};
