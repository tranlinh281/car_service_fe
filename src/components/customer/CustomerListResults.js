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
 CUSTOMER_BAN_SUCCESS,
 CUSTOMER_NOTIFICATION_SUCCESS
} from 'src/constants/customerConstant';
import { DialogContext } from 'src/contexts/dialogContexts/DialogUpdateAccessoryContextProvider';
import { customerHeader } from 'src/services/HeaderTitleTable';
import ConfirmDialog from '../dialog/dialogConfirm';
import LoadingTable from '../LoadingTable';
import VehicleListResult from './VehicleListResult';

export default function CustomerListResults({ loading, customers }) {
 const [confirmDialog, setConfirmDialog] = useState({
  isOpen: false,
  title: '',
  subTitle: ''
 });
 const { success: banSuccess } = useSelector((state) => state.banCus);
 const { success: notificationSuccess } = useSelector(
  (state) => state.customerNotification
 );
 console.log(notificationSuccess, 'debug noti');
 const { setShouldCreateNotificationDialogOpen } = useContext(DialogContext);
 useEffect(() => {
  if (banSuccess) {
   // Should create action creator for this
   dispatch({ type: CUSTOMER_BAN_SUCCESS, payload: false });
   dispatch(triggerReload({}));
  }
  if (notificationSuccess) {
   toast.success('Gửi thông báo thành công!');
   dispatch({ type: CUSTOMER_NOTIFICATION_SUCCESS, payload: false });
   dispatch(triggerReload({}));
   setShouldCreateNotificationDialogOpen(false);
  }
 }, [banSuccess, notificationSuccess]);

 const dispatch = useDispatch();

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
         <VehicleListResult customer={customer} />
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
