import {
 DialogActions,
 DialogContent,
 DialogContentText,
 DialogTitle,
 Grid,
 TextField
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { createCoupon } from 'src/actions/serviceAction';
import { DisplayingErrorMessagesCreateCouponSchema } from 'src/services/ValidConstants';

export default function CreateNotificationDialog({ data, open, onClose }) {
 const { types } = useSelector((state) => state.typeList);

 const [name, setName] = useState('');
 const [id, setId] = useState(data);
 const [value, setValue] = useState(0);
 const [description, setDescription] = useState();
 const [pointRequired, setPointRequired] = useState();
 const [couponModels, setCouponModels] = useState();

 const setForm = ({ id, name, value, description, pointRequired }) => {
  setName(name);
  setId(id);
  setDescription(description);
  setValue(value);
  setPointRequired(pointRequired);
 };

 const dispatch = useDispatch();

 const submitHandler = (coupon) => {
  console.log(coupon);
  dispatch(createCoupon(coupon));
 };

 useEffect(() => {
  setCouponModels((prev) => ({
   ...prev,
   id,
   name,
   value,
   description,
   pointRequired
  }));
 }, [id, name, value, description, pointRequired]);
 useEffect(() => {
  if (data && open) {
   setForm(data);
  }
 }, [data, open]);

 const handleReset = () => {};

 return (
  <>
   <Formik
    initialValues={{
     serviceId: data,
     name: '',
     description: '',
     value: '',
     pointRequired: ''
    }}
    validationSchema={DisplayingErrorMessagesCreateCouponSchema}
    validateOnChange
    validateOnBlur
    enableReinitialize
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
       <DialogTitle id="customized-dialog-title">Gửi thông báos</DialogTitle>
       <DialogContent dividers>
        <DialogContentText>
         <Grid item>
          <TextField
           fullWidth
           label="Tiêu đề"
           error={!!errors.name}
           helperText={errors.name}
           value={values.name}
           onBlur={handleBlur}
           onChange={handleChange}
           margin="normal"
           name="name"
           variant="outlined"
           required
          />
          <TextField
           multiline
           fullWidth
           label="Nội dung"
           margin="normal"
           error={!!errors.description}
           helperText={errors.description}
           onBlur={handleBlur}
           onChange={handleChange}
           name="description"
           variant="outlined"
           value={values.description}
          />
         
         
         </Grid>
        </DialogContentText>
       </DialogContent>
       <DialogActions>
        <Button autoFocus type="submit" color="primary" left>
         Lưu
        </Button>
        <Button autoFocus type="reset" onClick={onClose} color="secondary">
         Hủy
        </Button>
       </DialogActions>
      </Form>
     </Dialog>
    )}
   </Formik>
  </>
 );
}
