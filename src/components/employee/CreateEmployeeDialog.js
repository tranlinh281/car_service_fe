import {
 DialogActions,
 DialogContent,
 DialogContentText,
 DialogTitle,
 FormControl,
 Grid,
 InputLabel,
 MenuItem,
 Select,
 TextField
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { Form, Formik } from 'formik';
import React, { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createEmployee } from 'src/actions/userAction';
import { DisplayingErrorMessagesCreateEmployeeSchema } from 'src/services/ValidConstants';

const CreateEmployeeDialog = ({ data, open, onClose }) => {
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

 const submitHandler = (data) => {
  dispatch(createEmployee(data));
 };

const handleReset=()=>{};

 return (
  <Formik
   initialValues={{
    fullname: '',
    email: '',
    address: '',
    phoneNumber: '',
    dateOfBirth: '',
    role: ''
   }}
   validationSchema={DisplayingErrorMessagesCreateEmployeeSchema}
   validateOnChange
   validateOnBlur
   onSubmit={submitHandler}
   onReset={handleReset}
  >
   {({ errors, handleBlur, handleChange, values }) => (
    <Dialog
     onClose={onClose}
     aria-describedby="scroll-dialog-description"
     open={open}
     maxWidth={'sm'}
    >
     <Form>
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
           error={!!errors.fullname}
           helperText={errors.fullname}
           margin="normal"
           name="fullname"
           variant="outlined"
           value={values.fullname}
           onBlur={handleBlur}
           onChange={handleChange}
          />
          <TextField
           fullWidth
           label="Email"
           margin="normal"
           error={!!errors.email}
           helperText={errors.email}
           onBlur={handleBlur}
           onChange={handleChange}
           name="email"
           type="email"
           variant="outlined"
           value={values.email}
          />
          <TextField
           fullWidth
           label="Địa chỉ"
           error={!!errors.address}
           helperText={errors.address}
           onBlur={handleBlur}
           onChange={handleChange}
           margin="normal"
           name="address"
           variant="outlined"
           value={values.address}
          />
         </Grid>
         <Grid item xs={6}>
          <TextField
           fullWidth
           label="Số điện thoại"
           error={!!errors.phoneNumber}
           helperText={errors.phoneNumber}
           onBlur={handleBlur}
           onChange={handleChange}
           margin="normal"
           type="tel"
           name="phoneNumber"
           variant="outlined"
           value={values.phoneNumber}
          />

          <FormControl variant="outlined" margin="dense">
           <TextField
            id="date"
            name="dateOfBirth"
            label="Ngày sinh"
            type="date"
            InputLabelProps={{
             shrink: true
            }}
            value={values.dateOfBirth}
            onChange={handleChange}
            error={!!errors.dateOfBirth}
            helperText={errors.dateOfBirth}
            onBlur={handleBlur}
           />
          </FormControl>

          {/* <FormControl variant="outlined" margin='dense'> */}
          <InputLabel>Vị trí</InputLabel>
          <Select
           name="role"
           value={values.role}
           onChange={handleChange}
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
       <Button type="submit" color="primary" left>
        Lưu
       </Button>
       <Button onClick={onClose} type="reset" color="secondary">
        Hủy
       </Button>
      </DialogActions>
     </Form>
    </Dialog>
   )}
  </Formik>
 );
};
export default memo(CreateEmployeeDialog);
