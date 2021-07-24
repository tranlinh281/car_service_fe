import {
 DialogActions,
 DialogContent,
 DialogContentText,
 DialogTitle,
 FormControl,
 FormHelperText,
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
import { createManufacturer } from 'src/actions/manufacturerAction';
import { DisplayingErrorMessagesManufacturerSchema } from 'src/services/ValidConstants';

const CreateManufacturerDialog = ({ open, onClose }) => {
 const dispatch = useDispatch();

 const submitHandler = (data) => {
  dispatch(createManufacturer(data.manufacturer));
 };

 const handleReset = () => {};

 return (
  <Formik
   initialValues={{
    manufacturer: ''
   }}
   validationSchema={DisplayingErrorMessagesManufacturerSchema}
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
       Thêm mới loại xe
      </DialogTitle>

      <DialogContent dividers>
       {/* <DialogContentText> */}
       <Grid item>
        <TextField
         fullWidth
         label="Tên Hãng"
         error={!!errors.manufacturer}
         helperText={errors.manufacturer}
         margin="normal"
         name="manufacturer"
         variant="outlined"
         value={values.manufacturer}
         onBlur={handleBlur}
         onChange={handleChange}
        />
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
export default memo(CreateManufacturerDialog);
