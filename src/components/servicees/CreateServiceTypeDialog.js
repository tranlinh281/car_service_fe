import React, { memo } from 'react';
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
import { createTypeService } from 'src/actions/serviceAction';

const CreateServiceTypeDialog = () => {
 const [open, setOpen] = useState(false);

 const [name, setName] = useState('');

 const createServiceType = useSelector((state) => state.createServiceType);
 const { success, loading, error } = createServiceType;

 const dispatch = useDispatch();

 const submitHandler = (e) => {
  e.preventDefault();
  console.log(name);
  dispatch(createTypeService(name));
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
   >
    <Button variant="contained" color="primary" onClick={handleClickOpen}>
     Thêm loại Dịch vụ
    </Button>
   </Box>
   <Dialog
    onClose={handleClose}
    aria-describedby="scroll-dialog-description"
    open={open}
    fullWidth={true}
    maxWidth={'md'}
   >
    <DialogTitle id="customized-dialog-title">Thêm Loại Dịch vụ</DialogTitle>
    <DialogContent dividers>
     <DialogContentText>
      <Grid container spacing={3}>
       <TextField
        fullWidth
        label="Tên Loại Dịch vụ"
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
};
export default memo(CreateServiceTypeDialog);
