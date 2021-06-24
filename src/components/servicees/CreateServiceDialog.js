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
 TextField,
 Radio,
 RadioGroup,
 FormControlLabel,
 FormLabel,
 FormControl,
 InputLabel,
 MenuItem,
 Select
} from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { triggerReload } from 'src/actions/userAction';

import { createService, listServiceType } from 'src/actions/serviceAction';

export default function CreateServiceDialog() {
 toast.configure({
  autoClose: 2000,
  draggable: false,
  position: toast.POSITION.BOTTOM_RIGHT
 });
 const notify = () => toast('Thêm dịch vụ thành công!');

 const typeList = useSelector((state) => state.typeList);
 const { types } = typeList;
 console.log(types, 'list type');
 const [open, setOpen] = useState(false);
 const [openConfirm, setOpenConfirm] = useState(false);

 const [name, setName] = useState('');
 const [price, setPrice] = useState(0);
 const [type, setType] = useState('');

 const serviceModels = {
  name: name,
  type: type,
  price: price
 };

 const createServices = useSelector((state) => state.createServices);
 const { success, loading, error } = createServices;

 const dispatch = useDispatch();

 const submitHandler = (e) => {
  e.preventDefault();
  console.log(serviceModels);
  dispatch(createSservice(serviceModels));
 };

 const handleClickOpen = () => {
  setOpen(true);
 };
 const handleClose = () => {
  setOpen(false);
 };


 useEffect(() => {
  dispatch(listServiceType());
  if (success) {
   console.log(success);
   notify(true);
   setOpen(false);
   dispatch(triggerReload({}));
   //  window.location.reload();
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
     Thêm Dịch Vụ
    </Button>
   </Box>
   <Dialog
    onClose={handleClose}
    aria-describedby="scroll-dialog-description"
    open={open}
    fullWidth={true}
    maxWidth={'md'}
   >
    <DialogTitle id="customized-dialog-title">Thêm Dịch Vụ</DialogTitle>
    <DialogContent dividers>
     <DialogContentText>
      <Grid container spacing={3}>
       <Grid item xs={12} sm={6}>
        <TextField
         fullWidth
         label="Tên Dịch Vụ"
         margin="normal"
         name="name"
         variant="outlined"
         required
         onChange={(e) => setName(e.target.value)}
        />
        <TextField
         fullWidth
         label="Giá "
         margin="normal"
         name="price"
         type="number"
         required
         variant="outlined"
         onChange={(e) => setPrice(parseFloat(e.target.value))}
        />
       </Grid>
       <Grid item xs={6}>
        {/* <FormControl variant="outlined" margin='dense'> */}
        <InputLabel>Loại</InputLabel>

        <Select
         value={type}
         onChange={(e) => setType(e.target.value)}
         label="Loại"
        >
         {types?.map((type) => (
          <MenuItem value={type.name}>{type.name}</MenuItem>
         ))}
        </Select>

        {/* </FormControl> */}
       </Grid>
      </Grid>
      {/* </Form> */}
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
