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
import { createTypeService } from 'src/actions/serviceAction';
import { DisplayingErrorMessagesCreateTypeSchema } from 'src/services/ValidConstants';
import * as constant from 'src/utils/Constants';

export default function CreateServiceTypeDialog({ data, open, onClose }) {
 const { types } = useSelector((state) => state.typeList);

 const [name, setName] = useState('');
 const [id, setId] = useState('');
 const [price, setPrice] = useState(0);
 const [type, setType] = useState();
 const [serviceModels, setServiceModels] = useState();

 const createServices = useSelector((state) => state.createServices);
 const { success, loading, error } = createServices;

 const dispatch = useDispatch();

 const submitHandler = (data) => {
  const dataNew = data.name;
  console.log(dataNew);
  dispatch(createTypeService(dataNew));
 };

 useEffect(() => {
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
    initialValues={{ name: '' }}
    validationSchema={DisplayingErrorMessagesCreateTypeSchema}
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
        {constant.TITLE_ADD_TYPE_SERVICE}
       </DialogTitle>
       <DialogContent dividers>
        <DialogContentText>
         <Grid item>
          <TextField
           fullWidth
           label={constant.LABEL_NAME_TYPE_SERVICE}
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
