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
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEmployee, triggerReload } from 'src/actions/userAction';
import { CREATE_EMPLOYEE_SUCCESS } from 'src/constants/userConstant';
import { toast } from 'react-toastify';

const CreateEmployeeDialog = ({ data, open, onClose }) => {
 const [openConfirm, setOpenConfirm] = useState(false);

 const [role, setRole] = useState('');
 const [fullname, setFullname] = useState('');
 const [phoneNumber, setPhoneNumber] = useState('');
 const [dateOfBirth, setDateOfBirth] = useState('');
 const [email, setEmail] = useState('');
 const [address, setAddress] = useState('');
 const [employeeModels, setEmployeeModels] = useState();

 const setForm = ({
  fullname,
  phoneNumber,
  dateOfBirth,
  email,
  address,
  role
 }) => {
  setFullname(fullname);
  setRole(role);
  setPhoneNumber(phoneNumber);
  setDateOfBirth(dateOfBirth);
  setEmail(email);
  setAddress(address);
 };
 useEffect(() => {
  setEmployeeModels((prev) => ({
   ...prev,
   fullname,
   phoneNumber,
   dateOfBirth,
   email,
   address,
   role
  }));
 }, [fullname, phoneNumber, dateOfBirth, email, address, role]);
 useEffect(() => {
  if (data && open) {
   setForm(data);
   setEmployeeModels(data);
  }
 }, [data, open]);

 const dispatch = useDispatch();

 const submitHandler = (e) => {
  e.preventDefault();
  dispatch(createEmployee(employeeModels));
 };

 return (
  <>
   <Dialog
    onClose={onClose}
    aria-describedby="scroll-dialog-description"
    open={open}
    maxWidth={'sm'}
   >
    <DialogTitle id="customized-dialog-title" onClose={onClose}>
     Thêm mới Nhân viên
    </DialogTitle>
    <DialogContent dividers>
     <DialogContentText>
      <Grid container spacing={3}>
       <Grid item xs={12} sm={6}>
        <TextField
         fullWidth
         label="Họ tên"
         margin="normal"
         name="fullname"
         variant="outlined"
         onChange={(e) => setFullname(e.target.value)}
        />
        <TextField
         fullWidth
         label="Email"
         margin="normal"
         name="email"
         type="email"
         variant="outlined"
         onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
         fullWidth
         label="Địa chỉ"
         margin="normal"
         name="address"
         variant="outlined"
         onChange={(e) => setAddress(e.target.value)}
        />
       </Grid>
       <Grid item xs={6}>
        <TextField
         fullWidth
         label="Số điện thoại"
         margin="normal"
         name="phoneNumber"
         variant="outlined"
         onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <FormControl variant="outlined" margin="dense">
         <TextField
          id="date"
          label="Ngày sinh"
          type="date"
          InputLabelProps={{
           shrink: true
          }}
          onChange={(e) => setDateOfBirth(e.target.value)}
         />
        </FormControl>

        {/* <FormControl variant="outlined" margin='dense'> */}
        <InputLabel>Vị trí</InputLabel>
        <Select
         value={role}
         onChange={(e) => setRole(e.target.value)}
         label="Vị trí"
        >
         <MenuItem value="manager">Quản lý</MenuItem>
         <MenuItem value="staff">Kỹ thuật viên</MenuItem>
        </Select>
       </Grid>
      </Grid>
     </DialogContentText>
    </DialogContent>
    <DialogActions>
     <Button autoFocus onClick={submitHandler} color="primary" left>
      Lưu
     </Button>
     <Button autoFocus onClick={onClose} color="secondary">
      Hủy
     </Button>
    </DialogActions>
   </Dialog>
  </>
 );
};
export default memo(CreateEmployeeDialog);
