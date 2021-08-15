import PerfectScrollbar from 'react-perfect-scrollbar';
import {
 Box,
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableRow
} from '@material-ui/core';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { customerHeader } from 'src/services/HeaderTitleTable';
import LoadingTable from '../LoadingTable';
import ButtonAction from '../ButtonAction';
import { Close, LockOpen, Lock } from '@material-ui/icons';
import ConfirmDialog from '../dialog/dialogConfirm';
import { toast } from 'react-toastify';
import { CUSTOMER_BAN_SUCCESS } from 'src/constants/customerConstant';
import { triggerReload } from 'src/actions/userAction';
import { banCust } from 'src/actions/customerAction';

export default function CustomerListResults({ loading, customers }) {
 const [confirmDialog, setConfirmDialog] = useState({
  isOpen: false,
  title: '',
  subTitle: ''
 });
 const [isBanned, setIsBanned] = useState();
 const [openPopup, setOpenPopup] = useState(false);
 const { success: banSuccess } = useSelector((state) => state.banCus);
 // const employeeDelete = useSelector((state) => state.employeeDelete);
 // const { success } = employeeDelete;
 useEffect(() => {
  if (banSuccess) {
   // Should create action creator for this
   dispatch({ type: CUSTOMER_BAN_SUCCESS, payload: false });
   dispatch(triggerReload({}));
  }
 }, [banSuccess]);

 const dispatch = useDispatch();

 const banHandler = (customer, isBanned) => {
  console.log(isBanned, 'debug cus boolean');
  dispatch(banCust(customer.username, isBanned));
  toast.success('Ban thành công!');
 };
 const unBan = (customer, isBanned) => {
  console.log(isBanned, 'debug cus boolean');
  dispatch(banCust(customer.username, isBanned));
  toast.success('unBan thành công!');
 };
 return (
  <>
   {loading ? (
    <LoadingTable></LoadingTable>
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
          <TableCell>{customer.isBanned}</TableCell>
          <TableCell>
           {customer.isBanned == 0 && (
            <ButtonAction
             color="secondary"
             value="true"
             name="isBanned"
             onClick={() => {
              setConfirmDialog({
               isOpen: true,
               title: 'Bạn có chắc muốn Ban khách hàng này?',
               onConfirm: () => {
                banHandler(customer, true), setConfirmDialog({ isOpen: false });
               }
              });
             }}
            >
             <LockOpen color="primary" />
            </ButtonAction>
           )}
           {customer.isBanned == 1 && (
            <ButtonAction
             color="secondary"
             value="false"
             name="isBanned"
             onClick={() => {
              setConfirmDialog({
               isOpen: true,
               title: 'Bạn có chắc muốn unBan khách hàng này?',
               onConfirm: () => {
                unBan(customer, false), setConfirmDialog({ isOpen: false });
               }
              });
             }}
            >
             <Lock color="error" />
            </ButtonAction>
           )}
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
