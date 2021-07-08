import PerfectScrollbar from 'react-perfect-scrollbar';
import {
 Box,
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableRow
} from '@material-ui/core';
import { useState } from 'react';
import Popup from '../Popup';
import { useDispatch } from 'react-redux';
import { customerHeader } from 'src/services/HeaderTitleTable';
import LoadingBox from '../LoadingBox';

export default function CustomerListResults({ loading, customers }) {
 const [openPopup, setOpenPopup] = useState(false);


 // const employeeDelete = useSelector((state) => state.employeeDelete);
 // const { success } = employeeDelete;

 const dispatch = useDispatch();

 // const deleteHandler = (customer) => {
 //     if (window.confirm('Are you sure?')) {
 //         dispatch(deleteEmployee(customer.taiKhoan));
 //         dispatch(triggerReload({}));
 //     }
 // };

 const test = (customer) => {};

 const openInPopup = (customer) => {
  setOpenPopup(true);
 };

 return (
  <>
   {loading ? (
    <LoadingBox></LoadingBox>
   ) : (
    <PerfectScrollbar>
     <Box sx={{ minWidth: 1050 }}>
      <Table>
       <TableHead>
        <TableRow>
         {customerHeader.map((headCell) => (
          <TableCell key={headCell.id}>{headCell.title}</TableCell>
         ))}
        </TableRow>
       </TableHead>

       <TableBody>
        {customers?.map((customer) => (
         <TableRow hover key={customer.username}>
          <TableCell>{customer.username}</TableCell>
          <TableCell>{customer.email}</TableCell>
          <TableCell>{customer.fullname}</TableCell>
          <TableCell>{customer.phoneNumber}</TableCell>
          <TableCell>{customer.address}</TableCell>
          <TableCell>{customer.accumulatedPoint}</TableCell>

          <TableCell></TableCell>
         </TableRow>
        ))}
       </TableBody>
      </Table>
     </Box>
    </PerfectScrollbar>
   )}
   <Popup
    title="Thông tin nhân viên"
    openPopup={openPopup}
    setOpenPopup={setOpenPopup}
   ></Popup>
  </>
 );
}
