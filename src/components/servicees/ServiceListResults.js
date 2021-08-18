import {
 Box,
 IconButton,
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableRow
} from '@material-ui/core';
import { Close, Edit, LocalOffer } from '@material-ui/icons';
import { useContext, useEffect, useState } from 'react';
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
// import EditEmployeeDialog from './EditEmployeeDialog';
import { couponHeader, serviceHeader } from 'src/services/HeaderTitleTable';
import ButtonAction from '../ButtonAction';
import ConfirmDialog from '../dialog/dialogConfirm';
import LoadingTable from '../LoadingTable';
import Collapse from '@material-ui/core/Collapse';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import React from 'react';

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
  console.log(dataNew, 'debug servielist result');
  setUpdateCouponDefaultValue(dataNew);
 };

 const handleOpenCouponDialog = (editData) => {
  setShouldCreateCouponDialogOpen(true);
  setUpdateServiceDefaultValue(editData);
 };
 const [open, setOpen] = React.useState(false);

 const numberFormat = (value) =>
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(
   value
  );

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
            <Collapse in={open} key={service.name} timeout="auto" unmountOnExit>
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
                    onClick={() =>
                     handleOpenCouponEditDialog(coupon, service.id)
                    }
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
         </>
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
