import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { banCust } from 'src/actions/customerAction';
import { triggerReload } from 'src/actions/userAction';
import { CUSTOMER_BAN_SUCCESS } from 'src/constants/customerConstant';
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
  dispatch(banCust(customer.username, isBanned));
  toast.success('khóa thành công!');
 };
 const unBan = (customer, isBanned) => {
  dispatch(banCust(customer.username, isBanned));
  toast.success('Mở khóa thành công!');
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
