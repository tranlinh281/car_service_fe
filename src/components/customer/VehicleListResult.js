import {
 Box,
 Collapse,
 IconButton,
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableRow
} from '@material-ui/core';
import { Lock, LockOpen } from '@material-ui/icons';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { banCust } from 'src/actions/customerAction';
import { DialogContext } from 'src/contexts/dialogContexts/DialogUpdateAccessoryContextProvider';
import { vehicleHeader } from 'src/services/HeaderTitleTable';
import ButtonAction from '../ButtonAction';
import ConfirmDialog from '../dialog/dialogConfirm';

export default function VehicleListResult({ customer = {} }) {
 const [confirmDialog, setConfirmDialog] = useState({
  isOpen: false,
  title: '',
  subTitle: ''
 });
 const dispatch = useDispatch();
 const [open, setOpen] = React.useState(false);

 const banHandler = (customer, isBanned) => {
  dispatch(banCust(customer.username, isBanned));
  toast.success('khóa thành công!');
 };
 const unBan = (customer, isBanned) => {
  dispatch(banCust(customer.username, isBanned));
  toast.success('Mở khóa thành công!');
 };

 const { setShouldCreateNotificationDialogOpen } = useContext(DialogContext);

 //edit service

 //coupon edit
 const handleOpenNotificationDialog = () => {
  setShouldCreateNotificationDialogOpen(true);
 };

 return (
  <>
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
         title: 'Bạn có chắc muốn khóa khách hàng này?',
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
         title: 'Bạn có chắc muốn mở khóa khách hàng này?',
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
    <TableCell>
     <IconButton
      aria-label="expand row"
      size="small"
      onClick={() => setOpen(!open)}
     >
      {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
     </IconButton>
    </TableCell>
   </TableRow>
   <TableRow>
    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
     <Collapse in={open} id={customer.username} timeout="auto" unmountOnExit>
      <Box margin={1}>
       <Table size="small" aria-label="purchases">
        <TableHead>
         <TableRow>
          {vehicleHeader.map((headCell) => (
           <TableCell key={headCell.id}>{headCell.title}</TableCell>
          ))}
         </TableRow>
        </TableHead>
        <TableBody>
         {customer.vehicles?.map((vehicle) => (
          <TableRow key={vehicle.manufacturer}>
           <TableCell>{vehicle.manufacturer}</TableCell>
           <TableCell>{vehicle.model}</TableCell>
           <TableCell>{vehicle.licensePlate}</TableCell>
           {vehicle.dateOfLastMaintenance === null ? (
            <TableCell>N/A</TableCell>
           ) : (
            <TableCell>{vehicle.dateOfLastMaintenance}</TableCell>
           )}
           {vehicle.millageCount === 0 ? (
            <TableCell>N/A</TableCell>
           ) : (
            <TableCell>{vehicle.millageCount}</TableCell>
           )}
           <TableCell>
            <ButtonAction
             variant="contained"
             color="primary"
             onClick={handleOpenNotificationDialog}
            >
             <NotificationsNoneIcon color="primary" />
            </ButtonAction>
           </TableCell>
          </TableRow>
         ))}
        </TableBody>
       </Table>
      </Box>
     </Collapse>
    </TableCell>
   </TableRow>
   <ConfirmDialog
    confirmDialog={confirmDialog}
    setConfirmDialog={setConfirmDialog}
   />
  </>
 );
}
