import PerfectScrollbar from 'react-perfect-scrollbar';
import {
 Box,
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableRow
} from '@material-ui/core';
import { Close, EditOutlined } from '@material-ui/icons';
import ButtonAction from '../ButtonAction';
import { useEffect, useState } from 'react';
import Popup from '../Popup';
import ConfirmDialog from '../dialog/dialogConfirm';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEmployee, triggerReload } from 'src/actions/userAction';
import EditEmployeeDialog from './EditEmployeeDialog';

export default function EmployeeListResult({ employees }) {
 const [openPopup, setOpenPopup] = useState(false);

 const employeeDelete = useSelector((state) => state.employeeDelete);
 const { success } = employeeDelete;

 const dispatch = useDispatch();
 //  useEffect(() => {
 //   dispatch(listEmployee());
 //  }, [dispatch, success]);
 const deleteHandler = (customer) => {
  if (window.confirm('Are you sure?')) {
   dispatch(deleteEmployee(customer.taiKhoan));
   dispatch(triggerReload({}));
  }
 };

 const test = (customer) => {};

 const openInPopup = (customer) => {
  setOpenPopup(true);
 };

 return (
  <>
   <PerfectScrollbar>
    <Box sx={{ minWidth: 1050 }}>
     <Table>
      <TableHead>
       <TableRow>
        <TableCell padding="checkbox"></TableCell>
        <TableCell>Tài Khoản</TableCell>
        <TableCell>Họ tên</TableCell>
        <TableCell>Email</TableCell>
        <TableCell>Số Điện Thoại</TableCell>
        <TableCell>Loại người dùng</TableCell>
        <TableCell></TableCell>
       </TableRow>
      </TableHead>
      <TableBody>
       {employees?.map((customer) => (
        <TableRow hover key={customer.taiKhoan}>
         <TableCell padding="checkbox"></TableCell>
         <TableCell>{customer.taiKhoan}</TableCell>
         <TableCell>{customer.hoTen}</TableCell>
         <TableCell>{customer.email}</TableCell>
         <TableCell>{customer.soDt}</TableCell>
         <TableCell>{customer.maLoaiNguoiDung}</TableCell>
         <TableCell>
          <EditEmployeeDialog
           dataFromParent={customer}
           phoneNumber={customer.soDt}
          />
         </TableCell>
         <TableCell>
          <ButtonAction
           color="secondary"
           onClick={() => deleteHandler(customer)}
          >
           <Close fontSize="small" />
          </ButtonAction>
         </TableCell>
        </TableRow>
       ))}
      </TableBody>
     </Table>
    </Box>
   </PerfectScrollbar>
   <Popup
    title="Thông tin nhân viên"
    openPopup={openPopup}
    setOpenPopup={setOpenPopup}
   ></Popup>
  </>
 );
}
