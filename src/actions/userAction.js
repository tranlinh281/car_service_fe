import Axios from 'axios';
import {
 EMPLOYEE_LIST_FAIL,
 EMPLOYEE_LIST_REQUEST,
 EMPLOYEE_LIST_SUCCESS,
 USER_LOGIN_FAIL,
 USER_LOGIN_REQUEST,
 USER_LOGIN_SUCCESS,
 USER_LOGOUT
} from 'src/constants/userConstant';

export const login = (taiKhoan, matKhau) => async (dispatch) => {
 dispatch({ type: USER_LOGIN_REQUEST, payload: { taiKhoan, matKhau } });
 try {
  const { data } = await Axios.post(
   'https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap',
   { taiKhoan, matKhau }
  );
  dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  localStorage.setItem('userInfo', JSON.stringify(data));
 } catch (error) {
  const message =
   error.respone && error.respone.data.message
    ? error.respone.data.message
    : error.message;
  dispatch({ type: USER_LOGIN_FAIL, payload: message });
 }
};
export const logout = () => (dispatch) => {
 localStorage.removeItem('userInfo');
 dispatch({ type: USER_LOGOUT });
};

export const listEmployee = () => async (dispatch) => {
 dispatch({ type: EMPLOYEE_LIST_REQUEST });
 try {
  console.log('thu di');
  const { data } = await Axios.get(
   'https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung',{}
  );
  console.log(data);
  dispatch({ type: EMPLOYEE_LIST_SUCCESS, payload: data.body });
 } catch (error) {
  console.log('chiem em ne');
  const message =
   error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
  dispatch({ type: EMPLOYEE_LIST_FAIL, payload: message });
 }
};
