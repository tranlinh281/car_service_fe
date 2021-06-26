import { Edit } from '@material-ui/icons';
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DialogContext } from 'src/contexts/dialogContexts/DialogUpdateAccessoryContextProvider';
import ButtonAction from '../ButtonAction';

// Có thể sẽ éo xài cái component này nữa
export default function EditAccessoryButton({ editData }) {
 toast.configure({
  autoClose: 2000,
  draggable: false,
  position: toast.POSITION.BOTTOM_RIGHT
 });
 const notify = () => toast('Cập nhật Thành công!');
 const errorNoti = () => toast('Cập nhật Thành công!');

 const { success, loading, error, test } = useSelector(
  (state) => state.editAccessory
 );
 const { setShouldUpdateAccessoryDialogOpen, setUpdateAccessoryDefaultValue } =
  useContext(DialogContext);

 const handleClickOpenEditDialog = () => {
  setShouldUpdateAccessoryDialogOpen(true);
 };

 useEffect(() => {
  console.log('debug', editData);
  if (editData) {
   setUpdateAccessoryDefaultValue(editData);
  }
 }, [editData, setUpdateAccessoryDefaultValue]);

 useEffect(() => {
  console.log('debug', success);
  if (success) {
   setOpen(false);
   notify(true);
  } else if (error) {
   errorNoti(true);
  }
 }, [success]);

 return (
  <>
   <ButtonAction
    variant="contained"
    color="primary"
    onClick={handleClickOpenEditDialog}
   >
    <Edit fontSize="small" />
   </ButtonAction>
  </>
 );
}
