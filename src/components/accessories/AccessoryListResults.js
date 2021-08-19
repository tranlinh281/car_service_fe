import {
 Box,
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableRow,
 Avatar
} from '@material-ui/core';
import { Close, Edit, Image } from '@material-ui/icons';
import { useContext, useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteAccessory } from 'src/actions/accessoryAction';
import { triggerReload } from 'src/actions/userAction';
import {
 CREATE_ACCESSORY_SUCCESS,
 CREATE_ACCESSORY_TYPE_SUCCESS,
 DELETE_ACCESSORY_SUCCESS,
 EDIT_ACCESSORY_SUCCESS
} from 'src/constants/accessoryConstant';
import { DialogContext } from 'src/contexts/dialogContexts/DialogUpdateAccessoryContextProvider';
import {
 accessoryHeader,
 manufacturerHeader
} from 'src/services/HeaderTitleTable';
import ButtonAction from '../ButtonAction';
import ConfirmDialog from '../dialog/dialogConfirm';
import LoadingTable from 'src/components/LoadingTable';

export default function AccessoryListResults({ loading, accessories }) {
 const [confirmDialog, setConfirmDialog] = useState({
  isOpen: false,
  title: '',
  subTitle: ''
 });
 const { success: deleteSuccess } = useSelector(
  (state) => state.accessoryDelete
 );
 const { success: updateSuccess } = useSelector((state) => state.editAccessory);
 const { success: createTypeSuccess } = useSelector(
  (state) => state.createAccessoryType
 );

 const { success: createSuccess } = useSelector(
  (state) => state.createAccessories
 );

 const dispatch = useDispatch();
 const {
  setShouldUpdateAccessoryDialogOpen,
  setUpdateAccessoryDefaultValue,
  setShouldCreateAccessoryDialogOpen
 } = useContext(DialogContext);

 const deleteHandler = (accessory) => {
  dispatch(deleteAccessory(accessory.id));
 };

 useEffect(() => {
  if (deleteSuccess) {
   toast.success('Xóa phụ tùng thành công!');
   // Should create action creator for this
   dispatch({ type: DELETE_ACCESSORY_SUCCESS, payload: false });
   dispatch(triggerReload({}));
  }

  if (updateSuccess) {
   toast.success('Cập nhật phụ tùng thành công!');
   // Should create action creator for this
   dispatch({ type: EDIT_ACCESSORY_SUCCESS, payload: false });
   dispatch(triggerReload({}));

   setShouldUpdateAccessoryDialogOpen(false);
  }

  if (createSuccess) {
   toast.success('Thêm mới phụ tùng thành công!');
   // Should create action creator for this
   dispatch({ type: CREATE_ACCESSORY_SUCCESS, payload: false });
   dispatch(triggerReload({}));

   setShouldCreateAccessoryDialogOpen(false);
  }
  if (createTypeSuccess) {
   toast.success('Thêm mới phân loại thành công!');
   // Should create action creator for this
   dispatch({ type: CREATE_ACCESSORY_TYPE_SUCCESS, payload: false });
   dispatch(triggerReload({}));
   setShouldCreateAccessoryDialogOpen(false);
  }
 }, [deleteSuccess, updateSuccess, createSuccess, createTypeSuccess]);

 const handleOpenEditDialog = (editData) => {
  setShouldUpdateAccessoryDialogOpen(true);
  setUpdateAccessoryDefaultValue(editData);
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
         {accessoryHeader.map((headCell) => (
          <TableCell key={headCell.id}>{headCell.title}</TableCell>
         ))}
        </TableRow>
       </TableHead>

       <TableBody>
        {accessories?.map((accessory) => (
         <TableRow hover key={accessory.id}>
          <TableCell>
           <img
            src={accessory.imageUrl}
            style={{
             height: 50,
             width: 50
            }}
           />
          </TableCell>
          <TableCell>{accessory.name}</TableCell>
          <TableCell>{accessory.quantity}</TableCell>
          <TableCell>{numberFormat(accessory.price)}</TableCell>
          <TableCell>{accessory.unit}</TableCell>
          <TableCell>{accessory.type}</TableCell>
          <TableCell>{accessory.manufacturer}</TableCell>
          <TableCell>
           <ButtonAction
            variant="contained"
            color="primary"
            onClick={() => handleOpenEditDialog(accessory)}
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
               deleteHandler(accessory), setConfirmDialog({ isOpen: false });
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
    </PerfectScrollbar>
   )}
   <ConfirmDialog
    confirmDialog={confirmDialog}
    setConfirmDialog={setConfirmDialog}
   />
  </>
 );
}
