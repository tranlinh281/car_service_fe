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
import { useState } from 'react';
import Popup from '../Popup';
import ConfirmDialog from '../dialog/dialogConfirm';
import { deleteEmployee } from 'src/services/UserAPI';
import { useDispatch, useSelector } from 'react-redux';

export default function EmployeeListResult({ employees }) {
  const [openPopup, setOpenPopup] = useState(false);

  const openInPopup = item => {
    setOpenPopup(true)
  }


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
                    <ButtonAction
                      color="primary"
                      onClick={() => { openInPopup(customer) }}
                    >
                      <EditOutlined fontSize="small" />
                    </ButtonAction>
                    <ButtonAction
                      color="secondary"
                      
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
      >
      </Popup>
      
    </>
  );
}