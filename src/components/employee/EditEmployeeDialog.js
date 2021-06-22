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

export default function EditEmployeeDialog(props) {
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
     Nhân viên{' '}
     <span>
      <strong>{dataFromParent.username}</strong>
     </span>
    </DialogTitle>
    <DialogContent dividers>
     <DialogContentText>
      <Grid container spacing={3}>
       <Grid item xs={12} sm={6}>
        <TextField
         fullWidth
         label="Tài Khoản"
         margin="normal"
         value={dataFromParent.username}
         name="username"
         variant="outlined"
         disabled={true}
        />
        <TextField
         fullWidth
         label="Họ tên"
         margin="normal"
         value={dataFromParent.fullname}
         name="fullname"
         variant="outlined"
         disabled={true}
         InputLabelProps={{
          shrink: true
         }}
        />

        <TextField
         fullWidth
         label="Địa chỉ"
         margin="normal"
         value={dataFromParent.address}
         name="address"
         variant="outlined"
         disabled={true}
         InputLabelProps={{
          shrink: true
         }}
        />
        <TextField
         fullWidth
         label="Email"
         margin="normal"
         value={dataFromParent.email}
         name="email"
         variant="outlined"
         disabled={true}
         InputLabelProps={{
          shrink: true
         }}
        />
       </Grid>
       <Grid item xs={6}>
        <TextField
         fullWidth
         label="Số điện thoại"
         margin="normal"
         value={dataFromParent.phoneNumber}
         name="phoneNumber"
         variant="outlined"
         disabled={true}
        />

        <FormControl variant="outlined" margin="dense">
         <TextField
          id="date"
          label="Ngày sinh"
          type="date"
          value={dataFromParent.dateOfBirth.split('T')[0]}
          InputLabelProps={{
           shrink: true
          }}
          disabled={true}
         />
        </FormControl>

        {/* <FormControl variant="outlined" margin='dense'> */}
        <InputLabel>Vị trí</InputLabel>
        <Select
         value={dataFromParent.role}
         // disabled={true}
         label="Vị trí"
         onChange={(e) => setRole(e.target.value)}
         variant="outlined"
        >
         <MenuItem value="manager">Quản lý</MenuItem>
         <MenuItem value="staff">Kỹ thuật viên</MenuItem>
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
