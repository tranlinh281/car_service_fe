import Axios from 'axios';
import {
 CREATE_EMPLOYEE_FAIL,
 CREATE_EMPLOYEE_REQUEST,
 CREATE_EMPLOYEE_SUCCESS,
 EMPLOYEE_LIST_FAIL,
 EMPLOYEE_LIST_REQUEST,
 EMPLOYEE_LIST_SUCCESS,
 EMPLOYEE_SEARCH_FAIL,
 EMPLOYEE_SEARCH_REQUEST,
 EMPLOYEE_SEARCH_SUCCESS,
 USER_LOGIN_FAIL,
 USER_LOGIN_REQUEST,
 USER_LOGIN_SUCCESS,
 USER_LOGOUT,
 TRIGGER_RELOAD
} from 'src/constants/userConstant';

export const login = (username, password) => async (dispatch) => {
 dispatch({ type: USER_LOGIN_REQUEST, payload: { username, password } });
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
 (keySearch, pageNo = 1) =>
 async (dispatch) => {
  dispatch({ type: EMPLOYEE_LIST_REQUEST });

  try {
   const { data } =
    keySearch == undefined || keySearch == ''
     ? await Axios.get(
        `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/TimKiemNguoiDungPhanTrang?MaNhom=GP01&soTrang=${pageNo}&soPhanTuTrenTrang=10`
       )
     : await Axios.get(
        `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/TimKiemNguoiDungPhanTrang?MaNhom=GP01&tuKhoa=${keySearch}&soTrang=${pageNo}&soPhanTuTrenTrang=10`
       );
   dispatch({ type: EMPLOYEE_LIST_SUCCESS, payload: data });
   localStorage.setItem('keySearch', keySearch);
   localStorage.setItem('pageNo', pageNo);
  } catch (error) {
   const message =
    error.response && error.response.data.message
     ? error.response.data.message
     : error.message;
   dispatch({ type: EMPLOYEE_LIST_FAIL, payload: message });
  }
 };

export const createEmployee =
 (taiKhoan, matKhau, email, soDt, maNhom, maLoaiNguoiDung, hoTen) =>
 async (dispatch) => {
  dispatch({
   type: CREATE_EMPLOYEE_REQUEST,
   payload: { taiKhoan, matKhau, email, soDt, maNhom, maLoaiNguoiDung, hoTen }
  });
  try {
   const { data } = await Axios.post(
    'https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy',
    {
     taiKhoan,
     matKhau,
     email,
     soDt,
     maNhom,
     maLoaiNguoiDung,
     hoTen
    }
   );
   dispatch({ type: CREATE_EMPLOYEE_SUCCESS, payload: data });
  } catch (error) {
   dispatch({
    type: CREATE_EMPLOYEE_FAIL,
    payload:
     error.response && error.response.data.message
      ? error.response.data.message
      : error.message
   });
  }
 };

export const triggerReload = () => async (dispatch) => {
 dispatch({
  type: TRIGGER_RELOAD,
  payload: {}
 });
};
