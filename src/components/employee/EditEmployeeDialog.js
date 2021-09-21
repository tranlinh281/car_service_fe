import {
 Button,
 Dialog,
 DialogActions,
 DialogContent,
 DialogTitle,
 FormControl,
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
   maxWidth={'xs'}
   fullWidth={true}
  >
   <DialogTitle id="customized-dialog-title" onClose={onClose}>
    Nhân viên:
    <span>
     <strong>{data.fullname}</strong>
    </span>
   </DialogTitle>
   <DialogContent dividers>
    <Grid item>
     <TextField
      fullWidth
      label="Tên Nhân viên"
      margin="normal"
      defaultValue={data.fullname}
      name="name"
      variant="outlined"
      InputProps={{
       readOnly: true
      }}
     />

     <TextField
      fullWidth
      label="Địa chỉ Email"
      margin="normal"
      defaultValue={data.email}
      name="email"
      variant="outlined"
      InputProps={{
       readOnly: true
      }}
      InputLabelProps={{
       shrink: true
      }}
     />
     <TextField
      fullWidth
      label="Địa chỉ"
      margin="normal"
      defaultValue={data.address}
      InputProps={{
       readOnly: true
      }}
      name="address"
      variant="outlined"
      InputLabelProps={{
       shrink: true
      }}
     />

     <TextField
      fullWidth
      label="Số điện thoại"
      margin="normal"
      defaultValue={data.phoneNumber}
      InputProps={{
       readOnly: true
      }}
      name="phoneNumber"
      variant="outlined"
      InputLabelProps={{
       shrink: true
      }}
     />
     <Grid container spacing={2}>
      <Grid item xs={6} sm={6}>
       <TextField
        id="date"
        label="Ngày sinh"
        type="date"
        value={data.dateOfBirth?.split('T')[0] || ''}
        InputProps={{
         readOnly: true
        }}
        name="dateOfBirth"
        margin="normal"
        variant="outlined"
        InputLabelProps={{
         shrink: true
        }}
       />
      </Grid>
      <Grid item xs={6} sm={6}>
       <FormControl variant="outlined" margin="normal" fullWidth>
        <InputLabel>Vị Trí</InputLabel>
        <Select
         defaultValue={data.role}
         onChange={(e) => setRole(e.target.value)}
         label="Vị Trí"
        >
         <MenuItem value="manager">Quản lý</MenuItem>
         <MenuItem value="staff">Kỹ thuật viên</MenuItem>
        </Select>
       </FormControl>
      </Grid>
     </Grid>
    </Grid>
   </DialogContent>
   <DialogActions color="red">
    <Button autoFocus onClick={onClose} color="secondary">
     Hủy
    </Button>
    <Button autoFocus onClick={submitHandler} color="primary" left>
     Lưu
    </Button>
   </DialogActions>
  </Dialog>
 );
};

export default memo(DialogUpdateEmployee);
