import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
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
import getInitials from 'src/utils/getInitials';
import { useDispatch, useSelector } from 'react-redux';
import { listEmployee } from 'src/actions/userAction';

export default function EmployeeListResult ()  {
 const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
 const [limit, setLimit] = useState(10);
 const [page, setPage] = useState(0);

 const employeeList = useSelector((state) => state.employeeList);
 const { loading, error, employees } = employeeList;
 const dispatch = useDispatch();
 useEffect(() => {
  dispatch(listEmployee());
}, [dispatch]);
console.log("tesst");
console.log(employees );
 const handleSelectAll = (event) => {
  let newSelectedCustomerIds;

  if (event.target.checked) {
   newSelectedCustomerIds = customers.map((customer) => customer.id);
  } else {
   newSelectedCustomerIds = [];
  }

  setSelectedCustomerIds(newSelectedCustomerIds);
 };

 const handleSelectOne = (event, id) => {
  const selectedIndex = selectedCustomerIds.indexOf(id);
  let newSelectedCustomerIds = [];

  if (selectedIndex === -1) {
   newSelectedCustomerIds = newSelectedCustomerIds.concat(
    selectedCustomerIds,
    id
   );
  } else if (selectedIndex === 0) {
   newSelectedCustomerIds = newSelectedCustomerIds.concat(
    selectedCustomerIds.slice(1)
   );
  } else if (selectedIndex === selectedCustomerIds.length - 1) {
   newSelectedCustomerIds = newSelectedCustomerIds.concat(
    selectedCustomerIds.slice(0, -1)
   );
  } else if (selectedIndex > 0) {
   newSelectedCustomerIds = newSelectedCustomerIds.concat(
    selectedCustomerIds.slice(0, selectedIndex),
    selectedCustomerIds.slice(selectedIndex + 1)
   );
  }

  setSelectedCustomerIds(newSelectedCustomerIds);
 };

 const handleLimitChange = (event) => {
  setLimit(event.target.value);
 };

 const handlePageChange = (event, newPage) => {
  setPage(newPage);
 };

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
      {/* <TableBody>
       {employees.map((customer) => (
        <TableRow
         hover
         key={customer.taiKhoan}
         selected={selectedCustomerIds.indexOf(customer.taiKhoan) !== -1}
        >
         <TableCell padding="checkbox">
          <Checkbox
           checked={selectedCustomerIds.indexOf(customer.taiKhoan) !== -1}
           onChange={(event) => handleSelectOne(event, customer.taiKhoan)}
           value="true"
          />
         </TableCell>
         <TableCell>
          <Box
           sx={{
            alignItems: 'center',
            display: 'flex'
           }}
          >
           <Typography color="textPrimary" variant="body1">
            {customer.hoTen}
           </Typography>
          </Box>
         </TableCell>
         <TableCell>{customer.email}</TableCell>
  
         <TableCell>{customer.soDt}</TableCell>
         <TableCell>
          {moment(customer.maLoaiNguoiDung)}
         </TableCell>
        </TableRow>
       ))}
      </TableBody> */}
     
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
};

EmployeeListResult.propTypes = {
 customers: PropTypes.array.isRequired
};


