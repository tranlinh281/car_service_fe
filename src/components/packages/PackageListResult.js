import {
 Box,
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableRow
} from '@material-ui/core';
import { Close, Edit } from '@material-ui/icons';
import { memo, useContext, useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { triggerReload } from 'src/actions/userAction';
import { EDIT_EMPLOYEE_SUCCESS } from 'src/constants/userConstant';
import { DialogContext } from 'src/contexts/dialogContexts/DialogUpdateAccessoryContextProvider';
import { packageHeader } from 'src/services/HeaderTitleTable';
import LoadingTable from 'src/components/LoadingTable';
import ButtonAction from '../ButtonAction';
import ConfirmDialog from '../dialog/dialogConfirm';
import {
 CREATE_PACKAGE_SUCCESS,
 DELETE_PACKAGE_SUCCESS,
 EDIT_PACKAGE_SUCCESS
} from 'src/constants/packageConstant';
import { deletePackage } from 'src/actions/packageAction';

const PackageListResult = ({ loading, packages, errorMessage }) => {
 const [confirmDialog, setConfirmDialog] = useState({
  isOpen: false,
  title: '',
  subTitle: ''
 });

 const { success: deleteSuccess } = useSelector((state) => state.packageDelete);
 const { success: updateSuccess } = useSelector((state) => state.editPackage);

 const { success: createSuccess } = useSelector((state) => state.createPackage);

 const dispatch = useDispatch();
 const {
  setShouldCreatePackageDialogOpen,
  setShouldUpdatePackageDialogOpen,
  setUpdatePackageDefaultValue
 } = useContext(DialogContext);

 useEffect(() => {
  if (deleteSuccess) {
   toast.success('Xóa gói dịch vụ thành công!');
   // Should create action creator for this
   dispatch({ type: DELETE_PACKAGE_SUCCESS, payload: false });
   dispatch(triggerReload({}));
  }

  if (updateSuccess) {
   toast.success('Cập nhật gói dịch vụ thành công!');
   // Should create action creator for this
   dispatch({ type: EDIT_PACKAGE_SUCCESS, payload: false });
   dispatch(triggerReload({}));

   setShouldUpdatePackageDialogOpen(false);
  }

  if (createSuccess) {
   toast.success('Thêm mới gói dịch vụ thành công!');
   // Should create action creator for this
   dispatch({ type: CREATE_PACKAGE_SUCCESS, payload: false });
   dispatch(triggerReload({}));

   setShouldCreatePackageDialogOpen(false);
  }
 }, [deleteSuccess, updateSuccess, createSuccess]);
 const handleOpenEditDialog = (editData) => {
  setShouldUpdatePackageDialogOpen(true);
  setUpdatePackageDefaultValue(editData);
 };

 const deleteHandler = (packagee) => {
  dispatch(deletePackage(packagee.id));
 };
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
         {packageHeader.map((headCell) => (
          <TableCell key={headCell.id}>{headCell.title}</TableCell>
         ))}
        </TableRow>
       </TableHead>
       <TableBody>
        {(packages?.length &&
         packages?.map((packagee) => (
          <TableRow hover key={packagee.name}>
           <TableCell>{packagee.name}</TableCell>
           <TableCell>{packagee.description}</TableCell>
           <TableCell>{numberFormat(packagee.price)}</TableCell>
           {/* <TableCell>{package.phoneNumber}</TableCell> */}
           <TableCell>
            <ButtonAction
             variant="contained"
             color="primary"
             onClick={() => handleOpenEditDialog(packagee)}
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
                deleteHandler(packagee), setConfirmDialog({ isOpen: false });
               }
              });
             }}
            >
             <Close fontSize="small" color="secondary" />
            </ButtonAction>
           </TableCell>
          </TableRow>
         ))) ||
         errorMessage}
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
};
export default memo(PackageListResult);
