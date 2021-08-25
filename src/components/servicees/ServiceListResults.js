import {
 Box,
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableRow
} from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteCoupon, deleteService } from 'src/actions/serviceAction';
import { triggerReload } from 'src/actions/userAction';
import {
 CREATE_COUPON_SUCCESS,
 CREATE_SERVICE_SUCCESS,
 CREATE_SERVICE_TYPE_SUCCESS,
 DELETE_COUPON_SUCCESS,
 DELETE_SERVICE_SUCCESS,
 EDIT_COUPON_SUCCESS,
 EDIT_SERVICE_SUCCESS
} from 'src/constants/serviceConstant';
import { DialogContext } from 'src/contexts/dialogContexts/DialogUpdateAccessoryContextProvider';
import { serviceHeader } from 'src/services/HeaderTitleTable';
import ConfirmDialog from '../dialog/dialogConfirm';
import LoadingTable from '../LoadingTable';
import CouponListResult from './CouponListResult';

export default function ServiceListResults({ loading, services }) {
 const [confirmDialog, setConfirmDialog] = useState({
  isOpen: false,
  title: '',
  subTitle: ''
 });
 console.log(services, 'debug services list');

 const { success: deleteSuccess } = useSelector((state) => state.serviceDelete);
 const { success: deleteCouponSuccess } = useSelector(
  (state) => state.couponDelete
 );
 const { success: updateSuccess } = useSelector((state) => state.editService);
 const { success: updateCouponSuccess } = useSelector(
  (state) => state.editCoupon
 );
 const { success: createSuccess } = useSelector(
  (state) => state.createServices
 );
 const { success: createCouponSuccess } = useSelector(
  (state) => state.createCoupon
 );
 const { success: createTypeSuccess } = useSelector(
  (state) => state.createServiceType
 );

 const deleteHandler = (service) => {
  dispatch(deleteService(service.id));
 };

 const deleteCouponHandler = (coupon) => {
  dispatch(deleteCoupon(coupon.id));
 };

 const dispatch = useDispatch();

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

 useEffect(() => {
  if (deleteSuccess) {
   toast.success('Xóa dịch vụ thành công!');
   // Should create action creator for this
   dispatch({ type: DELETE_SERVICE_SUCCESS, payload: false });
   dispatch(triggerReload({}));
  }
  if (deleteCouponSuccess) {
   toast.success('Xóa Khuyến mãi thành công!');
   // Should create action creator for this
   dispatch({ type: DELETE_COUPON_SUCCESS, payload: false });
   dispatch(triggerReload({}));
  }

  if (updateSuccess) {
   toast.success('Cập nhật dịch vụ thành công!');
   // Should create action creator for this
   dispatch({ type: EDIT_SERVICE_SUCCESS, payload: false });
   dispatch(triggerReload({}));
   setShouldUpdateServiceDialogOpen(false);
  }
  if (updateCouponSuccess) {
   toast.success('Cập nhật Khuyến mãi thành công!');
   // Should create action creator for this
   dispatch({ type: EDIT_COUPON_SUCCESS, payload: false });
   dispatch(triggerReload({}));
   setShouldUpdateCouponDialogOpen(false);
  }

  if (createSuccess) {
   toast.success('Thêm mới dịch vụ thành công!');
   // Should create action creator for this
   dispatch({ type: CREATE_SERVICE_SUCCESS, payload: false });
   dispatch(triggerReload({}));
   setShouldCreateServiceDialogOpen(false);
  }
  if (createCouponSuccess) {
   toast.success('Thêm Khuyến mãi thành công!');
   // Should create action creator for this
   dispatch({ type: CREATE_COUPON_SUCCESS, payload: false });
   dispatch(triggerReload({}));
   setShouldCreateCouponDialogOpen(false);
  }
  if (createTypeSuccess) {
   toast.success('Thêm mới Phân loại thành công!');
   // Should create action creator for this
   dispatch({ type: CREATE_SERVICE_TYPE_SUCCESS, payload: false });
   dispatch(triggerReload({}));
   setShouldCreateTypeDialogOpen(false);
  }
 }, [
  deleteSuccess,
  updateSuccess,
  createSuccess,
  createTypeSuccess,
  createCouponSuccess,
  updateCouponSuccess,
  deleteCouponSuccess
 ]);

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
         {serviceHeader.map((headCell) => (
          <TableCell key={headCell.id}>{headCell.title}</TableCell>
         ))}
        </TableRow>
       </TableHead>

       <TableBody>
        {services?.map((service) => (
         <CouponListResult service={service} />
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
