import {
 Box,
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableRow
} from '@material-ui/core';
import { memo, useContext, useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { triggerReload } from 'src/actions/userAction';
import LoadingTable from 'src/components/LoadingTable';
import {
 CREATE_PACKAGE_SUCCESS,
 DELETE_PACKAGE_SUCCESS,
 EDIT_PACKAGE_SUCCESS
} from 'src/constants/packageConstant';
import { DialogContext } from 'src/contexts/dialogContexts/DialogUpdateAccessoryContextProvider';
import { packageHeader } from 'src/services/HeaderTitleTable';
import ConfirmDialog from '../dialog/dialogConfirm';
import ServicePackageListResult from './ServicePackageListResult';
import * as constant from 'src/utils/Constants';

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
   toast.success(constant.POPUP_DELETE_PACKAGE);
   // Should create action creator for this
   dispatch({ type: DELETE_PACKAGE_SUCCESS, payload: false });
   dispatch(triggerReload({}));
  }

  if (updateSuccess) {
   toast.success(constant.POPUP_UPDATE_PACKAGE);
   // Should create action creator for this
   dispatch({ type: EDIT_PACKAGE_SUCCESS, payload: false });
   dispatch(triggerReload({}));

   setShouldUpdatePackageDialogOpen(false);
  }

  if (createSuccess) {
   toast.success(constant.POPUP_ADD_PACKAGE);
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
          <ServicePackageListResult packagee={packagee} />
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
