import { listEmployee } from 'src/actions/userAction';
import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
 Box,
 Card,
 Pagination,
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableRow
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

export default function EmployeeListResult() {
 const employeeList = useSelector((state) => state.employeeList);
 const { loading, error, employees, currentPage, totalPages, totalEmp } =
  employeeList;

 const [page, setPage] = useState(currentPage);
 const [keySearch, setKeySearch] = useState(localStorage.getItem('keySearch'));
 const dispatch = useDispatch();

 useEffect(() => {
  dispatch(listEmployee(keySearch, page));
  setPage(localStorage.removeItem('pageNo'))
 }, [dispatch, page, keySearch]);

 const handlePageChange = (event, value) => {
  setPage(value);
  console.log(value, 'value ne');
  setKeySearch(localStorage.getItem('keySearch'));
 };
 console.log(keySearch);
 console.log(page, 'result page');

 return (
  <Card>
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
        </TableRow>
       ))}
      </TableBody>
     </Table>
    </Box>
   </PerfectScrollbar>
   <Box
    sx={{
     display: 'flex',
     justifyContent: 'center',
     pt: 3
    }}
   >
    <Pagination
     color="primary"
     count={totalPages}
     size="medium"
     onChange={handlePageChange}
    />
   </Box>
  </Card>
 );
}
