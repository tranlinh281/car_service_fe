import { listEmployee } from 'src/actions/userAction';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
 Avatar,
 Box,
 Card,
 Checkbox,
 Table,
 TableBody,
 TableCell,
 TableHead,
 TablePagination,
 TableRow,
 Typography
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

export default function EmployeeListResult() {
 const employeeList = useSelector((state) => state.employeeList);
 const { loading, error, employees } = employeeList;
 const dispatch = useDispatch();
 useEffect(() => {
  dispatch(listEmployee());
 }, [dispatch]);

 console.log('tesst');
 console.log(employees);

 return (
  <Card>
   <PerfectScrollbar>
    <Box sx={{ minWidth: 1050 }}>
     <Table>
      <TableHead>
       <TableRow>
        <TableCell padding="checkbox">
         {/* <Checkbox
          checked={selectedCustomerIds.length === customers.length}
          color="primary"
          indeterminate={
           selectedCustomerIds.length > 0 &&
           selectedCustomerIds.length < customers.length
          }
          onChange={handleSelectAll}
         /> */}
        </TableCell>
        <TableCell>Tài Khoản</TableCell>
        <TableCell>Họ tên</TableCell>
        <TableCell>Email</TableCell>
        <TableCell>Số Điện Thoại</TableCell>
        <TableCell>Loại người dùng</TableCell>
       </TableRow>
      </TableHead>
      <TableBody>
       {employees?.map((customer) => (
        <TableRow hover key={customer.maLoaiNguoiDung}>
         <TableCell padding="checkbox"></TableCell>
         <TableCell>
          <Box
           sx={{
            alignItems: 'center',
            display: 'flex'
           }}
          >
           <Typography color="textPrimary" variant="body1">
            {customer.taiKhoan}
           </Typography>
          </Box>
         </TableCell>
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
   {/* <TablePagination
    component="div"
    count={customers.length}
    onPageChange={handlePageChange}
    onRowsPerPageChange={handleLimitChange}
    page={page}
    rowsPerPage={limit}
    rowsPerPageOptions={[5, 10, 25]}
   /> */}
  </Card>
 );
}
