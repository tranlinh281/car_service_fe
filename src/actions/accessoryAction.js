import Axios from 'axios';
import { ACCESSORY_LIST_FAIL, ACCESSORY_LIST_REQUEST, ACCESSORY_LIST_SUCCESS, CREATE_ACCESSORY_FAIL, CREATE_ACCESSORY_REQUEST, CREATE_ACCESSORY_SUCCESS } from 'src/constants/accessoryConstant';
import { GET_ACCESSORY_BY_USERNAME_URL, GET_ACCESSORY_LIST_URL, POST_NEW_ACCESSORY } from 'src/services/Config';
const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json, text/plain, */*',
    // Authorization:
    //   'Bearer ' +
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTExMTEyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiUXVhblRyaSIsIm5iZiI6MTYyMzA4MDI2MSwiZXhwIjoxNjIzMDgzODYxfQ.kJxGYbJzRjCCg4qy3OO0XjglTcuIOhoeY6ynmmxmwUo'
  };

  export const listAccessory = (keySearch) =>
  (dispatch) => {
    dispatch({ type: ACCESSORY_LIST_REQUEST });
    try {
      if (keySearch == undefined || keySearch == '') {
        Axios.get(
            GET_ACCESSORY_LIST_URL
        ).then(res => {
          dispatch({ type: ACCESSORY_LIST_SUCCESS, payload: res.data });
        })
      } else {
        // const arData = [];
        Axios.get(
            GET_ACCESSORY_BY_USERNAME_URL + keySearch
        ).then(respo => {
          // arData.push(respo.data)
          // console.log(arData);
          dispatch({ type:ACCESSORY_LIST_SUCCESS, payload: respo.data });
        })
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

  export const createAccessory =
  (accessoryModels) =>
    async (dispatch) => {
      dispatch({
        type: CREATE_ACCESSORY_REQUEST,
        payload: { accessoryModels }
      });
      try {
        const { data } = await Axios.post(
          POST_NEW_ACCESSORY  ,
          accessoryModels
        );
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