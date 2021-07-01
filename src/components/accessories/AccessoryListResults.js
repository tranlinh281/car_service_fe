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
 DELETE_ACCESSORY_SUCCESS,
 EDIT_ACCESSORY_SUCCESS
} from 'src/constants/accessoryConstant';
import { DialogContext } from 'src/contexts/dialogContexts/DialogUpdateAccessoryContextProvider';
import { accessoryHeader } from 'src/services/HeaderTitleTable';
import ButtonAction from '../ButtonAction';
import ConfirmDialog from '../dialog/dialogConfirm';
import Popup from '../Popup';

const user = {
 avatar: '/static/images/avatars/avatar_6.png',
 city: 'Los Angeles',
 country: 'USA',
 jobTitle: 'Senior Developer',
 name: 'Katarina Smith',
 timezone: 'GTM-7'
};
export default function AccessoryListResults({ accessories }) {
 const [openPopup, setOpenPopup] = useState(false);
 const [confirmDialog, setConfirmDialog] = useState({
  isOpen: false,
  title: '',
  subTitle: ''
 });
 const { success: deleteSuccess } = useSelector(
  (state) => state.accessoryDelete
 );
 const { success: updateSuccess } = useSelector((state) => state.editAccessory);

 const { success: createSuccess } = useSelector(
  (state) => state.createAccessories
 );

 console.log('id', accessories);

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
   toast.success('Xóa thành công!');
   // Should create action creator for this
   dispatch({ type: DELETE_ACCESSORY_SUCCESS, payload: false });
   dispatch(triggerReload({}));
  }

  if (updateSuccess) {
   toast.success('Cập nhật thành công!');
   // Should create action creator for this
   dispatch({ type: EDIT_ACCESSORY_SUCCESS, payload: false });
   dispatch(triggerReload({}));

   setShouldUpdateAccessoryDialogOpen(false);
  }

  if (createSuccess) {
   toast.success('Thêm mới thành công!');
   // Should create action creator for this
   dispatch({ type: CREATE_ACCESSORY_SUCCESS, payload: false });
   dispatch(triggerReload({}));

   setShouldCreateAccessoryDialogOpen(false);
  }
 }, [deleteSuccess, updateSuccess, createSuccess]);

 const handleOpenEditDialog = (editData) => {
  setShouldUpdateAccessoryDialogOpen(true);
  setUpdateAccessoryDefaultValue(editData);
 };

 return (
  <>
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
        <TableRow hover key={accessory.name}>
         <TableCell>
          <img
           src={'/static/images/avatars/avatar_3.png'}
           sx={{
            height: 100,
            width: 100
           }}
          />
         </TableCell>
         <TableCell>{accessory.name}</TableCell>
         <TableCell>{accessory.quantity}</TableCell>
         <TableCell>{accessory.price}</TableCell>
         <TableCell>{accessory.unit}</TableCell>
         <TableCell>{accessory.type}</TableCell>
         <TableCell>{accessory.manufacturer}</TableCell>
         <TableCell>
          <ButtonAction
           variant="contained"
           color="primary"
           onClick={() => handleOpenEditDialog(accessory)}
          >
           <Edit fontSize="small" />
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
           <Close fontSize="small" />
          </ButtonAction>
         </TableCell>
        </TableRow>
       ))}
      </TableBody>
     </Table>
    </Box>
   </PerfectScrollbar>
   <Popup
    title="Thông tin nhân viên"
    openPopup={openPopup}
    setOpenPopup={setOpenPopup}
   ></Popup>
   <ConfirmDialog
    confirmDialog={confirmDialog}
    setConfirmDialog={setConfirmDialog}
   />
  </>
 );
}
