import {
 Box,
 DialogActions,
 DialogContent,
 DialogContentText,
 DialogTitle,
 Grid,
 TextField
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTypeService } from 'src/actions/serviceAction';
import { triggerReload } from 'src/actions/userAction';

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
    <Button
     variant="contained"
     color="primary"
     sx={{ margin: '0 5px' }}
     onClick={handleClickOpen}
    >
     Thêm Phân loại Dịch vụ
    </Button>
   </Box>
   <Dialog
    onClose={handleClose}
    aria-describedby="scroll-dialog-description"
    open={open}
    fullWidth={true}
    maxWidth={'xs'}
   >
    <DialogTitle id="customized-dialog-title">
     Thêm Phân Loại Dịch vụ
    </DialogTitle>
    <DialogContent dividers>
     <DialogContentText>
      <Grid container>
       <>
        <TextField
         fullWidth
         label="Tên Phân Loại Dịch vụ"
         margin="normal"
         name="name"
         variant="outlined"
         required
         onChange={(e) => setName(e.target.value)}
        />
       </>
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
