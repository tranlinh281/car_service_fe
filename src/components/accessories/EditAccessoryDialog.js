import React from 'react';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import {
 DialogActions,
 DialogContent,
 DialogContentText,
 Grid,
 TextField,
 IconButton,
 Button,
 Dialog,
 Typography,
 DialogTitle,
 FormControl,
 Select,
 InputLabel,
 MenuItem
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateEmployee, triggerReload } from 'src/actions/userAction';
import ButtonAction from '../ButtonAction';
import { Edit, Close } from '@material-ui/icons';

export default function EditAccessoryDialog(props) {
 const manufacturerList = useSelector((state) => state.manufacturerList);
 const { manufacturers } = manufacturerList;
 const [name, setName] = useState('');
 const [quantity, setQuantity] = useState(0);
 const [price, setPrice] = useState(0);
 const [unit, setUnit] = useState('');
 const [type, setType] = useState('');
 const [manufacturer, setManufacturer] = useState('');  
 const { dataFromParent } = props;

 const [open, setOpen] = useState(false);
 const [openConfirm, setOpenConfirm] = useState(false);
 const [role, setRole] = useState();

 const editEmployee = useSelector((state) => state.editEmployee);
 const { success, loading, error } = editEmployee;

 const dispatch = useDispatch();

 const submitHandler = (e) => {
  e.preventDefault();
  dispatch(updateEmployee(role));
 };

 const handleClickOpen = () => {
  setOpen(true);
 };

 const handleClose = () => {
  setOpen(false);
 };

 useEffect(() => {
  if (success) {
   console.log(success);
   alert('Sửa thành công thành công');
   setOpen(false);
   dispatch(triggerReload({}));
  }
 }, [success]);
 console.log(dataFromParent.manufacturer, 'testing');

 return (
  <>
   <ButtonAction variant="contained" color="primary" onClick={handleClickOpen}>
    <Edit fontSize="small" />
   </ButtonAction>

   <Dialog
    onClose={handleClose}
    aria-describedby="scroll-dialog-description"
    open={open}
    // fullWidth={true}
    maxWidth={'sm'}
   >
    <DialogTitle id="customized-dialog-title" onClose={handleClose}>
     Phụ Tùng{' '}
     <span>
      <strong>{dataFromParent.name}</strong>
     </span>
    </DialogTitle>
    <DialogContent dividers>
     <DialogContentText>
      <Grid container spacing={3}>
       <Grid item xs={12} sm={6}>
        <TextField
         fullWidth
         label="Tên Phụ Tùng"
         margin="normal"
         value={dataFromParent.name}
         onChange={(e) => setName(e.target.value)}
         name="username"
         variant="outlined"
        />
        <TextField
         fullWidth
         label="Số Lượng"
         margin="normal"
         value={dataFromParent.quantity}
         name="fullname"
         variant="outlined"
         InputLabelProps={{
          shrink: true
         }}
        />

        <TextField
         fullWidth
         label="Đơn Giá"
         margin="normal"
         value={dataFromParent.price}
         name="address"
         variant="outlined"
         InputLabelProps={{
          shrink: true
         }}
        />
       </Grid>
       <Grid item xs={6}>
        <TextField
         fullWidth
         label="Đơn vị tính"
         margin="normal"
         value={dataFromParent.unit}
         name="email"
         variant="outlined"
         InputLabelProps={{
          shrink: true
         }}
        />
        <TextField
         fullWidth
         label="Loại"
         margin="normal"
         value={dataFromParent.type}
         name="phoneNumber"
         variant="outlined"
        />

        {/* <FormControl variant="outlined" margin='dense'> */}
        <InputLabel>Hãng</InputLabel>
        <Select
         value={dataFromParent.manufacturer}
         onChange={(e) => setManufacturer(e.target.value)}
         label="Hãng"
        >
         {manufacturers?.map((manufacturer) => (
          <MenuItem value={manufacturer}>{manufacturer}</MenuItem>
         ))}
        </Select>
        {/* </FormControl> */}
       </Grid>
      </Grid>
     </DialogContentText>
    </DialogContent>
    <DialogActions color="red">
     <Button autoFocus onClick={submitHandler} color="primary" left>
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
