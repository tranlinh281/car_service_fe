import {
 Box,
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableRow
} from '@material-ui/core';
import { useContext, useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { triggerReload } from 'src/actions/userAction';
import {
 ORDER_PAYMENT_SUCCESS,
 ORDER_STATUS_ID_RESET
} from 'src/constants/orderConstant';
import { DialogContext } from 'src/contexts/dialogContexts/DialogUpdateAccessoryContextProvider';
import { paymentHeader } from 'src/services/HeaderTitleTable';
import ConfirmDialog from '../dialog/dialogConfirm';
import LoadingTable from '../LoadingTable';
import PaymentExpandListResult from './PaymentExpandListResult';
import * as constant from 'src/utils/Constants';

export default function PaymentListResults({ loading, orders }) {
 const [confirmDialog, setConfirmDialog] = useState({
  isOpen: false,
  title: '',
  subTitle: ''
 });

 let cust = [];
 if (orders && orders.length) {
  orders.map((item) => {
   const dataNew = {
    id: item.id,
    dateCom: item.completeTime?.split('T')[0] || '',
    name: item.customer.fullname,
    address: item.customer.address,
    email: item.customer.email,
    phoneNumber: item.customer.phoneNumber,
    licensePlate: item.vehicle.licensePlate,
    manufacturer: item.vehicle.manufacturer
   };
   cust = [...cust, dataNew];
  });
 }
 const { setShouldCreatePaymentDialogOpen, shouldCreatePaymentDialogOpen } =
  useContext(DialogContext);

 const dispatch = useDispatch();
 const { success: paymentSuccess } = useSelector((state) => state.paymentCash);

 useEffect(() => {
  if (paymentSuccess) {
   toast.success(constant.TITLE_PAID);

   dispatch({ type: ORDER_PAYMENT_SUCCESS, payload: false });
   dispatch(triggerReload({}));

   setShouldCreatePaymentDialogOpen(false);
  }
 }, [paymentSuccess]);

 useEffect(() => {
  if (!shouldCreatePaymentDialogOpen) {
   dispatch({ type: ORDER_STATUS_ID_RESET });
  }
 }, [shouldCreatePaymentDialogOpen]);

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
         {paymentHeader.map((headCell) => (
          <TableCell key={headCell.id}>{headCell.title}</TableCell>
         ))}
        </TableRow>
       </TableHead>

       <TableBody>
        {cust?.map((customer) => (
         <PaymentExpandListResult customer={customer} />
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
