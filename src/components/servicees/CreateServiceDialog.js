import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import {
 Box,
 DialogActions,
 DialogContent,
 DialogContentText,
 DialogTitle,
 Grid,
 TextField,
 Radio,
 RadioGroup,
 FormControlLabel,
 FormLabel,
 FormControl,
 InputLabel,
 MenuItem,
 Select
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { triggerReload } from 'src/actions/userAction';

import { createService, listServiceType } from 'src/actions/serviceAction';
import { DisplayingErrorMessagesCreateServiceSchema } from 'src/services/ValidConstants';

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
   setAccessoryModels(data);
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
      maxWidth={'sm'}
     >
      <Form>
       <DialogTitle id="customized-dialog-title" >
        Thêm mới dịch vụ
       </DialogTitle>
       <DialogContent dividers>
        <DialogContentText>
         <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
           <TextField
            fullWidth
            label="Tên Dịch Vụ"
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
            label="Giá "
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
          </Grid>
          <Grid item xs={6}>
           <Select
            name="type"
            value={values.type}
            onChange={handleChange}
            label="Loại"
           >
            {types?.map((type) => (
             <MenuItem value={type.name}>{type.name}</MenuItem>
            ))}
           </Select>
          </Grid>
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
