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
import { updatePackage } from 'src/actions/packageAction';
import { listAllService } from './../../actions/serviceAction';
import * as constant from 'src/utils/Constants';
const DialogUpdatePackage = ({ data, open, onClose }) => {
 const [totalPrice, setTotalPrice] = useState(data.price);

 const { services } = useSelector((state) => state.serviceListAll);

 const triggerReload = useSelector((state) => state.triggerReload);
 const dispatch = useDispatch();
 useEffect(() => {
  dispatch(listAllService());
 }, [dispatch, triggerReload]);

 const submitHandler = ({ name, description, price, services }) => {
  const mappedData = {
   ...data,
   name,
   description,
   price,
   serviceIdList: services.map((service) => service.id)
  };

  dispatch(updatePackage(mappedData));
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
   enableReinitialize
   initialValues={{
    name: '',
    description: '',
    services: []
   }}
   //    validationSchema={DisplayingErrorMessagesPackageSchema}
   validateOnChange
   validateOnBlur
   onSubmit={submitHandler}
   onReset={handleReset}
  >
   {({ errors, handleBlur, handleChange, values, setFieldValue, ...props }) => {
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
        {constant.TITLE_UPDATE_PACKAGE}: <span>{data.name}</span>
       </DialogTitle>

       <DialogContent dividers>
        <Grid item>
         <TextField
          fullWidth
          label={constant.LABEL_NAME_PACKAGE}
          defaultValue={data.name}
          margin="normal"
          name="name"
          variant="outlined"
          onBlur={handleBlur}
          onChange={handleChange}
         />
        </Grid>
        <Grid item>
         <TextField
          multiline
          fullWidth
          label={constant.LABEL_DESCRIPTION}
          margin="normal"
          defaultValue={data.description}
          onBlur={handleBlur}
          onChange={handleChange}
          name="description"
          variant="outlined"
         />
        </Grid>
        <Grid item>
         <Autocomplete
          multiple
          id="tags-outlined"
          options={services || []}
          getOptionLabel={(option) => option.name}
          defaultValue={data.services?.map((ser) => ser)}
          getOptionSelected={(option, value) => option.name === value.name}
          onChange={(_, value) => {
           setFieldValue('services', value);
           setCalculatedTotal(value);
          }}
          filterSelectedOptions
          renderInput={(params) => (
           <TextField
            {...params}
            variant="outlined"
            label={constant.SERVICE_TITLE}
            name="services"
            // error={!!errors.services}
            // helperText={errors.services}
           />
          )}
         />
        </Grid>
        <Grid item>
         <TextField
          fullWidth
          label={constant.LABEL_PRICE_SERVICE}
          margin="normal"
          //   error={!!errors.price}
          //   helperText={errors.price}
          onBlur={handleBlur}
          onChange={handleChange}
          defaultValue={data.price || values.price}
          value={values.price}
          name="price"
          variant="outlined"
          InputProps={{
           readOnly: true
          }}
         />
        </Grid>
       </DialogContent>
       <DialogActions>
        <Button onClick={onClose} type="reset" color="secondary">
         {constant.TITLE_CANCEL}
        </Button>
        <Button type="submit" color="primary" left="true">
         {constant.TITLE_SAVE}
        </Button>
       </DialogActions>
      </Form>
     </Dialog>
    );
   }}
  </Formik>
 );
};
export default memo(DialogUpdatePackage);
