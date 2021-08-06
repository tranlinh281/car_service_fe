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
import ButtonAction from '../ButtonAction';
import { Close } from '@material-ui/icons';
import ConfirmDialog from '../dialog/dialogConfirm';

export default function CustomerListResults({ loading, customers }) {
 const [confirmDialog, setConfirmDialog] = useState({
  isOpen: false,
  title: '',
  subTitle: ''
 });
 const [ban, setBanned] = useState(true);
 const [openPopup, setOpenPopup] = useState(false);
 console.log(ban, 'setIsBanned');

 // const employeeDelete = useSelector((state) => state.employeeDelete);
 // const { success } = employeeDelete;

 const dispatch = useDispatch();

 const banHandler = (customer, isBanned) => {
  isBanned: 'true';
  console.log(customer.username, 'debug cus');
  console.log(isBanned, 'debug cus boolean');
  //   dispatch(banCustomer(customer.username, isBanned));
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
          <TableCell>
           <ButtonAction
            color="secondary"
            onClick={() => {
             setConfirmDialog({
              isOpen: true,
              title: 'Bạn có chắc muốn xóa?',
              onConfirm: () => {
               banHandler(customer), setConfirmDialog({ isOpen: false });
              }
             });
            }}
           >
            <Close fontSize="small" color="secondary" />
           </ButtonAction>
          </TableCell>
         </TableRow>
        ))}
       </TableBody>
      </Table>
     </Box>
    </PerfectScrollbar>
   )}
   <ConfirmDialog
    confirmDialog={confirmDialog}
    setConfirmDialog={setConfirmDialog}
   />
  </>
 );
}
