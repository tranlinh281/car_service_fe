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
import { Edit, Close, LocalOffer } from '@material-ui/icons';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { couponHeader } from 'src/services/HeaderTitleTable';
import ButtonAction from '../ButtonAction';
import React, { useContext, useEffect, useState } from 'react';
import { DialogContext } from 'src/contexts/dialogContexts/DialogUpdateAccessoryContextProvider';
import ConfirmDialog from '../dialog/dialogConfirm';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteCoupon, deleteService } from 'src/actions/serviceAction';
import {
 CREATE_COUPON_SUCCESS,
 CREATE_SERVICE_SUCCESS,
 CREATE_SERVICE_TYPE_SUCCESS,
 DELETE_COUPON_SUCCESS,
 DELETE_SERVICE_SUCCESS,
 EDIT_COUPON_SUCCESS,
 EDIT_SERVICE_SUCCESS
} from 'src/constants/serviceConstant';
import { triggerReload } from 'src/actions/userAction';

const numberFormat = (value) =>
 new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(
  value
 );

export default function CouponListResult({ service = {} }) {
 const [confirmDialog, setConfirmDialog] = useState({
  isOpen: false,
  title: '',
  subTitle: ''
 });
 const dispatch = useDispatch();
 const [open, setOpen] = React.useState(false);

 const deleteHandler = (service) => {
  dispatch(deleteService(service.id));
 };

 const deleteCouponHandler = (coupon) => {
  dispatch(deleteCoupon(coupon.id));
 };

 const {
  setShouldUpdateServiceDialogOpen,
  setUpdateServiceDefaultValue,
  setShouldCreateServiceDialogOpen,
  setShouldCreateTypeDialogOpen,
  //coupon
  setShouldCreateCouponDialogOpen,
  setShouldUpdateCouponDialogOpen,
  setUpdateCouponDefaultValue
 } = useContext(DialogContext);

 //edit service
 const handleOpenEditDialog = (editData) => {
  setShouldUpdateServiceDialogOpen(true);
  setUpdateServiceDefaultValue(editData);
 };
 //coupon edit
 const handleOpenCouponEditDialog = (coupon, serviceId) => {
  const dataNew = {
   ...coupon,
   serviceId
  };
  setShouldUpdateCouponDialogOpen(true);
  setUpdateCouponDefaultValue(dataNew);
 };
 const handleOpenCouponDialog = (editData) => {
  setShouldCreateCouponDialogOpen(true);
  setUpdateServiceDefaultValue(editData);
 };
 return (
  <>
   <TableRow hover key={service.name}>
    <TableCell>{service.name}</TableCell>
    <TableCell>{numberFormat(service.price)}</TableCell>
    <TableCell>{service.type}</TableCell>
    <TableCell>
     <ButtonAction>
      <LocalOffer
       variant="contained"
       color="primary"
       onClick={() => handleOpenCouponDialog(service.id)}
      ></LocalOffer>
     </ButtonAction>
    </TableCell>
    <TableCell>
     <ButtonAction
      variant="contained"
      color="primary"
      onClick={() => handleOpenEditDialog(service)}
     >
      <Edit fontSize="small" color="primary" />
     </ButtonAction>
     <ButtonAction
      color="secondary"
      onClick={() => {
       setConfirmDialog({
        isOpen: true,
        title: 'Bạn có chắc muốn xóa?',
        onConfirm: () => {
         deleteHandler(service), setConfirmDialog({ isOpen: false });
        }
       });
      }}
     >
      <Close fontSize="small" color="secondary" />
     </ButtonAction>
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
     <Collapse in={open} id={service.name} timeout="auto" unmountOnExit>
      <Box margin={1}>
       <Table size="small" aria-label="purchases">
        <TableHead>
         <TableRow>
          {couponHeader.map((headCell) => (
           <TableCell key={headCell.id}>{headCell.title}</TableCell>
          ))}
         </TableRow>
        </TableHead>
        <TableBody>
         {service.coupons?.map((coupon) => (
          <TableRow key={coupon.name}>
           <TableCell>{coupon.name}</TableCell>
           <TableCell>{coupon.description}</TableCell>
           <TableCell>{coupon.value}%</TableCell>
           <TableCell>{coupon.pointRequired}</TableCell>
           <TableCell>
            <ButtonAction
             variant="contained"
             color="primary"
             onClick={() => handleOpenCouponEditDialog(coupon, service.id)}
            >
             <Edit fontSize="small" color="primary" />
            </ButtonAction>
            <ButtonAction
             color="secondary"
             onClick={() => {
              setConfirmDialog({
               isOpen: true,
               title: 'Bạn có chắc muốn xóa?',
               onConfirm: () => {
                deleteCouponHandler(coupon),
                 setConfirmDialog({ isOpen: false });
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
