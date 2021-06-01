import Axios from 'axios';
import {
 USER_LOGIN_FAIL,
 USER_LOGIN_REQUEST,
 USER_LOGIN_SUCCESS
} from 'src/constants/userConstant';

export const userLogin = (email, password) => async (dispatch) => {
 dispatch({
  type: USER_LOGIN_REQUEST,
  payload: { email, password }
 });
 try {
  const data = await Axios.post('api/users/login', { email, password });
  dispatch({ USER_LOGIN_SUCCESS, payload: data });
  localStorage.setItem('userInfo', JSON.stringify(data));
 } catch (error) {
  dispatch({ type: USER_LOGIN_FAIL, payload: error });
 }
};
