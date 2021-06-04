import Axios from 'axios';
import {
 EMPLOYEE_LIST_FAIL,
 EMPLOYEE_LIST_REQUEST,
 EMPLOYEE_LIST_SUCCESS,
 EMPLOYEE_SEARCH_FAIL,
 EMPLOYEE_SEARCH_REQUEST,
 EMPLOYEE_SEARCH_SUCCESS,
 USER_LOGIN_FAIL,
 USER_LOGIN_REQUEST,
 USER_LOGIN_SUCCESS,
 USER_LOGOUT
} from 'src/constants/userConstant';

export const login = (username, password) => async (dispatch) => {
 dispatch({ type: USER_LOGIN_REQUEST, payload: { username , password } });
 try {
  const { data } = await Axios.post(
  ` https://localhost:44381/api/Users?username=${username}&password=${password}`
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

export const listEmployee =
 (keySearch, pageNo = 0) =>
 async (dispatch) => {
  dispatch({ type: EMPLOYEE_LIST_REQUEST });
  try {
   const { data } = (keySearch = ''
    ? await Axios.get(
       `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/TimKiemNguoiDungPhanTrang?MaNhom=GP01&soTrang=${pageNo}&soPhanTuTrenTrang=10`,
       console.log('gi the nay')
      )
    : await Axios.get(
       `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/TimKiemNguoiDungPhanTrang?MaNhom=GP01&tuKhoa=${keySearch}&soTrang=${pageNo}&soPhanTuTrenTrang=10`,
       console.log('gi the doan di nay')
      ));
   dispatch({ type: EMPLOYEE_LIST_SUCCESS, payload: data });
  } catch (error) {
   const message =
    error.response && error.response.data.message
     ? error.response.data.message
     : error.message;
   dispatch({ type: EMPLOYEE_LIST_FAIL, payload: message });
  }
 };
