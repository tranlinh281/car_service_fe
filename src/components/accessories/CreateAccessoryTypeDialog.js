import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import {
 Box,
 DialogActions,
 DialogContent,
 DialogContentText,
 DialogTitle,
 Grid,
 TextField
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { triggerReload } from 'src/actions/userAction';
import { createTypeAccessory } from 'src/actions/accessoryAction';

export default function CreateAccessoryTypeDialog() {
 const [open, setOpen] = useState(false);

 const [name, setName] = useState('');

 const createAccessoryType = useSelector((state) => state.createAccessoryType);
 const { success, loading, error } = createAccessoryType;

 const dispatch = useDispatch();

 const submitHandler = (e) => {
  e.preventDefault();
  console.log(e, 'debug create type');
  // dispatch(createTypeAccessory(name));
 };

 const handleClickOpen = () => {
  setOpen(true);
 };
 const handleClose = () => {
  setOpen(false);
 };

 useEffect(() => {
  if (success) {
   setOpen(false);
   dispatch(triggerReload({}));
  }
 }, [success]);

 return (
  <>
   <Box
    sx={{
     display: 'flex',
     justifyContent: 'flex-end'
    }}
   ></Box>
   <Dialog
    onClose={handleClose}
    aria-describedby="scroll-dialog-description"
    open={open}
    maxWidth={'md'}
    fullWidth={true}
   >
    <DialogTitle id="customized-dialog-title">
     Thêm Phân Loại Phụ tùng
    </DialogTitle>
    <DialogContent dividers>
     <DialogContentText>
      <Grid container spacing={3}>
       <TextField
        fullWidth
        label="Tên Phân Loại phụ tùng"
        margin="normal"
        name="name"
        variant="outlined"
        required
        onChange={(e) => setName(e.target.value)}
       />
      </Grid>
     </DialogContentText>
    </DialogContent>
    <DialogActions>
     <Button autoFocus onClick={submitHandler} color="primary">
      Lưu
     </Button>
     <Button autoFocus onClick={handleClose} color="secondary">
      Hủy
     </Button>
    </DialogActions>
   </Dialog>
  </>
 );
}
