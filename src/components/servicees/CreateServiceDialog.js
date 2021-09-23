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
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { createService, listServiceType } from 'src/actions/serviceAction';
import { DisplayingErrorMessagesCreateServiceSchema } from 'src/services/ValidConstants';
import * as constant from 'src/utils/Constants';

export default function CreateServiceDialog({ data, open, onClose }) {
 const { types } = useSelector((state) => state.typeList);

 const [name, setName] = useState('');
 const [id, setId] = useState('');
 const [price, setPrice] = useState(0);
 const [type, setType] = useState();
 const [serviceModels, setServiceModels] = useState();

 const setForm = ({ id, name, price, type }) => {
  setName(name);
  setId(id);
  setPrice(price);
  setType(type);
 };

 const createServices = useSelector((state) => state.createServices);
 const { success, loading, error } = createServices;

 const dispatch = useDispatch();

 const submitHandler = (data) => {
  console.log(data);
  dispatch(createService(data));
 };

 useEffect(() => {
  dispatch(listServiceType());
  setServiceModels((prev) => ({
   ...prev,
   id,
   name,
   price,
   type
  }));
 }, [id, name, price, type]);
 useEffect(() => {
  if (data && open) {
   setForm(data);
   setServiceModels(data);
  }
 }, [data, open]);

 const handleReset = () => {};

 return (
  <>
   <Formik
    initialValues={{
     name: '',
     price: '',
     type: ''
    }}
    validationSchema={DisplayingErrorMessagesCreateServiceSchema}
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
        {constant.TITLE_ADD_SERVICE}
       </DialogTitle>
       <DialogContent dividers>
        <DialogContentText>
         <Grid item>
          <TextField
           fullWidth
           label={constant.LABEL_NAME_SERVICE}
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
           fullWidth
           label={constant.LABEL_PRICE_SERVICE}
           error={!!errors.price}
           helperText={errors.price}
           value={values.price}
           onBlur={handleBlur}
           onChange={handleChange}
           margin="normal"
           name="price"
           type="number"
           required
           variant="outlined"
          />
          <FormControl
           variant="outlined"
           margin="normal"
           fullWidth
           error={!!errors.type}
          >
           <InputLabel>{constant.LABEL_TYPE_SERVICE}</InputLabel>
           <Select
            name="type"
            error={!!errors.type}
            helperText={errors.type}
            value={values.type}
            onBlur={handleBlur}
            onChange={handleChange}
            required
            label={constant.LABEL_TYPE_SERVICE}
           >
            {types?.map((type) => (
             <MenuItem value={type.name}>{type.name}</MenuItem>
            ))}
           </Select>
           <FormHelperText>{errors.type}</FormHelperText>
          </FormControl>
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
