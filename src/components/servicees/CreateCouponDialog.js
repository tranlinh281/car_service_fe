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
import * as constant from 'src/utils/Constants';

export default function CreateCouponDialog({ data, open, onClose }) {
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
       <DialogTitle id="customized-dialog-title">
        {constant.TITLE_ADD_COUPON}
       </DialogTitle>
       <DialogContent dividers>
        <DialogContentText>
         <Grid item>
          <TextField
           fullWidth
           label={constant.LABEL_NAME_COUPON}
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
           label={constant.LABEL_DESCRIPTION}
           margin="normal"
           error={!!errors.description}
           helperText={errors.description}
           onBlur={handleBlur}
           onChange={handleChange}
           name="description"
           variant="outlined"
           value={values.description}
          />
          <TextField
           fullWidth
           label={constant.LABEL_PERCENT}
           error={!!errors.value}
           helperText={errors.value}
           value={values.value}
           onBlur={handleBlur}
           onChange={handleChange}
           margin="normal"
           name="value"
           type="number"
           required
           variant="outlined"
          />
          <TextField
           fullWidth
           label={constant.LABEL_POINT}
           error={!!errors.pointRequired}
           helperText={errors.pointRequired}
           value={values.pointRequired}
           onBlur={handleBlur}
           onChange={handleChange}
           margin="normal"
           name="pointRequired"
           type="number"
           required
           variant="outlined"
          />
         </Grid>
        </DialogContentText>
       </DialogContent>
       <DialogActions>
        <Button autoFocus type="reset" onClick={onClose} color="secondary">
         {constant.TITLE_CANCEL}
        </Button>
        <Button autoFocus type="submit" color="primary" left>
         {constant.TITLE_SAVE}
        </Button>
       </DialogActions>
      </Form>
     </Dialog>
    )}
   </Formik>
  </>
 );
}
