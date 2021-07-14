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
import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { createEmployee } from 'src/actions/userAction';
import { DisplayingErrorMessagesCreateEmployeeSchema } from 'src/services/ValidConstants';

const CreateEmployeeDialog = ({ open, onClose }) => {
 const dispatch = useDispatch();

 const submitHandler = (data) => {
  dispatch(createEmployee(data));
 };

 const handleReset = () => {};

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
     maxWidth={'xs'}
     fullWidth={true}
    >
     <Form>
      <DialogTitle id="customized-dialog-title" onClose={onClose}>
       Thêm mới Nhân viên
      </DialogTitle>

      <DialogContent dividers>
       {/* <DialogContentText> */}
       <Grid item>
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
       </Grid>
       <Grid item>
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
       </Grid>
       <Grid item>
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
       <Grid item>
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
       </Grid>

       <Grid item container spacing={2}>
        <Grid item xs={6} sm={6}>
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
          margin="normal"
         />
        </Grid>
        <Grid item xs={6} sm={6}>
         <FormControl variant="outlined" margin="normal" fullWidth>
          <InputLabel>Vị trí</InputLabel>
          <Select
           name="role"
           value={values.role}
           error={!!errors.role}
           helperText={errors.role}
           onChange={handleChange}
           InputLabelProps={{
            shrink: true
           }}
           onBlur={handleBlur}
           label="Vị trí"
          >
           <MenuItem value="manager">Quản lý</MenuItem>
           <MenuItem value="staff">Kỹ thuật viên</MenuItem>
          </Select>
         </FormControl>
        </Grid>
       </Grid>
       {/* </DialogContentText> */}
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
