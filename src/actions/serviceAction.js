import Axios from 'axios';
import { SERVICE_LIST_FAIL, SERVICE_LIST_REQUEST, SERVICE_LIST_SUCCESS } from 'src/constants/serviceConstant';
import { GET_SERVICE_BY_USERNAME_URL, GET_SERVICE_LIST_URL } from 'src/services/Config';
const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json, text/plain, */*',
    // Authorization:
    //   'Bearer ' +
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTExMTEyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiUXVhblRyaSIsIm5iZiI6MTYyMzA4MDI2MSwiZXhwIjoxNjIzMDgzODYxfQ.kJxGYbJzRjCCg4qy3OO0XjglTcuIOhoeY6ynmmxmwUo'
  };

  export const listService = (keySearch) =>
  (dispatch) => {
    dispatch({ type: SERVICE_LIST_REQUEST });
    try {
      if (keySearch == undefined || keySearch == '') {
        Axios.get(
            GET_SERVICE_LIST_URL
        ).then(res => {
          dispatch({ type:SERVICE_LIST_SUCCESS, payload: res.data });
        })
      } else {
        // const arData = [];
        Axios.get(
            GET_SERVICE_BY_USERNAME_URL + keySearch
        ).then(respo => {
          // arData.push(respo.data)
          // console.log(arData);
          dispatch({ type:SERVICE_LIST_SUCCESS, payload: respo.data });
        })
      }
      localStorage.setItem('keySearch', keySearch);
      console.log(data);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: SERVICE_LIST_FAIL, payload: message });
    }
  };
