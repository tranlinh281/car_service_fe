import {
 Autocomplete,
 DialogActions,
 DialogContent,
 DialogTitle,
 Grid,
 TextField
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { Form, Formik } from 'formik';
import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPackage } from 'src/actions/packageAction';
import { DisplayingErrorMessagesPackageSchema } from 'src/services/ValidConstants';
import { listAllService } from './../../actions/serviceAction';

const CreatePackageDialog = ({ open, onClose }) => {
 const [totalPrice, setTotalPrice] = useState(0);

 const { services } = useSelector((state) => state.serviceListAll);
 const triggerReload = useSelector((state) => state.triggerReload);
 const dispatch = useDispatch();
 useEffect(() => {
  dispatch(listAllService());
 }, [dispatch, triggerReload]);

 const submitHandler = ({ name, description, price, services }) => {
  const mappedData = {
   name,
   description,
   price,
   serviceIdList: services.map((service) => service.id)
  };
  console.log(mappedData, 'debug ');
  dispatch(createPackage(mappedData));
  onClose();
 };

 const handleReset = () => {};

 const setCalculatedTotal = (services) => {
  const total = services.reduce((accumulator, currentValue) => {
   return (accumulator += currentValue.price);
  }, 0);

  setTotalPrice(total);
 };

 return (
  <Formik
   initialValues={{
    name: '',
    description: '',
    services: []
   }}
   //validationSchema={DisplayingErrorMessagesPackageSchema}
   validateOnChange
   validateOnBlur
   onSubmit={submitHandler}
   onReset={handleReset}
  >
   {({ errors, handleBlur, handleChange, values, setFieldValue }) => {
    useEffect(() => {
     setFieldValue('price', totalPrice);
    }, [totalPrice, setFieldValue]);

    return (
     <Dialog
      onClose={onClose}
      aria-describedby="scroll-dialog-description"
      open={open}
      maxWidth={'xs'}
      fullWidth={true}
     >
      <Form>
       <DialogTitle id="customized-dialog-title" onClose={onClose}>
        Thêm mới Gói dịch vụ
       </DialogTitle>

       <DialogContent dividers>
        <Grid item>
         <TextField
          fullWidth
          label="Tên gói dịch vụ"
          error={!!errors.name}
          helperText={errors.name}
          margin="normal"
          name="name"
          variant="outlined"
          value={values.name}
          onBlur={handleBlur}
          onChange={handleChange}
         />
        </Grid>
        <Grid item>
         <TextField
          multiline
          fullWidth
          label="Mô tả"
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
        <Grid item>
         <Autocomplete
          multiple
          id="tags-outlined"
          options={services || []}
          getOptionLabel={(option) => option.name}
          onChange={(_, value) => {
           setFieldValue('services', value);
           setCalculatedTotal(value);
          }}
          filterSelectedOptions
          renderInput={(params) => (
           <TextField
            {...params}
            variant="outlined"
            label="Dịch vụ"
            name="services"
            error={!!errors.services}
            helperText={errors.services}
           />
          )}
         />
        </Grid>
        <Grid item>
         <TextField
          fullWidth
          label="Giá tiền"
          margin="normal"
          error={!!errors.price}
          helperText={errors.price}
          onBlur={handleBlur}
          onChange={handleChange}
          name="price"
          variant="outlined"
          value={values.price}
          InputProps={{
           readOnly: true
          }}
         />
        </Grid>
       </DialogContent>
       <DialogActions>
        <Button onClick={onClose} type="reset" color="secondary">
         Hủy
        </Button>
        <Button type="submit" color="primary" left="true">
         Lưu
        </Button>
       </DialogActions>
      </Form>
     </Dialog>
    );
   }}
  </Formik>
 );
};
export default memo(CreatePackageDialog);
