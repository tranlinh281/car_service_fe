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
import { useEffect, useMemo, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { listEmployee } from 'src/actions/userAction';

export default function EmployeeListResult() {
 const triggerReload = useSelector((state) => state.triggerReload);

 const { loading, error, employees, currentPage, totalPages, totalEmp } =
  useSelector((state) => state.employeeList);

 const [page, setPage] = useState(currentPage);
 const [keySearch, setKeySearch] = useState(localStorage.getItem('keySearch'));
 const dispatch = useDispatch();

 useEffect(() => {
  if (!page) return;
  dispatch(listEmployee(keySearch, page));
  setPage(localStorage.removeItem('pageNo'));
 }, [dispatch, page, keySearch, triggerReload]);

 const handlePageChange = (event, value) => {
  setPage(value);
  //   setKeySearch(localStorage.getItem('keySearch'));
 };

 const renderedPagination = useMemo(() => {
  console.log('debug renderedPagination');
  return (
   <Pagination
    defaultPage={1}
    default
    color="primary"
    count={totalPages}
    size="medium"
    onChange={handlePageChange}
   />
  );
 }, [totalPages, handlePageChange, triggerReload]);

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
    {renderedPagination}
   </Box>
  </Card>
 );
}
