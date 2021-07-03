import {
 Button,
 Dialog,
 DialogActions,
 DialogContent,
 DialogContentText,
 DialogTitle,
 Grid,
 InputLabel,
 MenuItem,
 Select,
 TextField
} from '@material-ui/core';
import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateEmployee } from 'src/actions/userAction';

const DialogUpdateEmployee = ({ data, open, onClose }) => {
 const dispatch = useDispatch();
 const [role, setRole] = useState('');
 const [username, setUsername] = useState('');
 const [employeeModels, setEmployeeModels] = useState();

 const setForm = ({ username, role }) => {
  setUsername(username);
  setRole(role);
 };

 useEffect(() => {
  setEmployeeModels((prev) => ({
   ...prev,
   username,
   role
  }));
 }, [username, role]);

 useEffect(() => {
  if (data && open) {
   setForm(data);
   setEmployeeModels(data);
  }
 }, [data, open]);

 const submitHandler = (e) => {
  e.preventDefault();
  dispatch(updateEmployee(employeeModels));
 };

 return (
  <Dialog
   onClose={onClose}
   aria-describedby="scroll-dialog-description"
   open={open}
   maxWidth={'sm'}
  >
   <DialogTitle id="customized-dialog-title" onClose={onClose}>
    Nhân viên:
    <span>
     <strong>{data.fullname}</strong>
    </span>
   </DialogTitle>
   <DialogContent dividers>
    <DialogContentText>
     <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
       <TextField
        fullWidth
        label="Tên Nhân viên"
        margin="normal"
        disabled
        defaultValue={data.fullname}
        name="name"
        variant="outlined"
       />

       <TextField
        fullWidth
        label="Địa chỉ Email"
        margin="normal"
        defaultValue={data.email}
        disabled
        name="email"
        variant="outlined"
        InputLabelProps={{
         shrink: true
        }}
       />
       <TextField
        fullWidth
        label="Địa chỉ"
        margin="normal"
        defaultValue={data.address}
        disabled
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
        label="Số điện thoại"
        margin="normal"
        defaultValue={data.phoneNumber}
        disabled
        name="phoneNumber"
        variant="outlined"
        InputLabelProps={{
         shrink: true
        }}
       />
       <TextField
        id="date"
        label="Ngày sinh"
        type="date"
        value={data.dateOfBirth?.split('T')[0] || ''}
        disabled
        name="dateOfBirth"
        variant="outlined"
        InputLabelProps={{
         shrink: true
        }}
       />
       <InputLabel>Vị Trí</InputLabel>

       <Select
        defaultValue={data.role}
        onChange={(e) => setRole(e.target.value)}
        label="Loại"
       >
        <MenuItem value="manager">Quản lý</MenuItem>
        <MenuItem value="staff">Kỹ thuật viên</MenuItem>
       </Select>
      </Grid>
     </Grid>
    </DialogContentText>
   </DialogContent>
   <DialogActions color="red">
    <Button autoFocus onClick={submitHandler} color="primary" left>
     Lưu
    </Button>
    <Button autoFocus onClick={onClose} color="secondary">
     Hủy
    </Button>
   </DialogActions>
  </Dialog>
 );
};

export default memo(DialogUpdateEmployee);
