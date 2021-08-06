import {
 DialogActions,
 DialogContent,
 Autocomplete,
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
import { FieldArray, Form, Formik } from 'formik';
import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
 createModel,
 listAllManufacturer
} from 'src/actions/manufacturerAction';
import { DisplayingErrorMessagesModelSchema } from 'src/services/ValidConstants';

const CreateModelDialog = ({ open, onClose }) => {
 const { manufacturers } = useSelector((state) => state.manufacturerListAll);
 const dispatch = useDispatch();
 console.log(manufacturers, 'debug manu list all');
 useEffect(() => {
  dispatch(listAllManufacturer());
 }, [listAllManufacturer]);
 const submitHandler = (modelsT) => {
  dispatch(createModel(modelsT));
  console.log(modelsT, 'debug create model');
 };

 const handleReset = () => {};

 return (
  <Formik
   initialValues={{
    manufacturerName: '',
    models: [{ name }]
   }}
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
     maxWidth={'md'}
     fullWidth={true}
    >
     <Form>
      <DialogTitle id="customized-dialog-title" onClose={onClose}>
       Thêm mới Loại xe
      </DialogTitle>

      <DialogContent dividers>
       <Grid item xs={6} sm={6}>
        <FieldArray
         name="models"
         render={(arrayHelpers) => {
          const models = values.models;
          return (
           <div>
            {models.map((item, index) => (
             <TextField
              fullWidth
              label="Tên Loại xe"
              margin="normal"
              name={`models.${index}.name`}
              variant="outlined"
              value={models[`${index}`].name}
              onBlur={handleBlur}
              onChange={handleChange}
             />
            ))}
           </div>
          );
         }}
        />
        <Grid item>
         <FormControl variant="outlined" margin="normal" fullWidth>
          <InputLabel>Hãng</InputLabel>
          <Select
           name="manufacturerName"
           value={values.manufacturerName}
           onChange={handleChange}
           label="Hãng"
          >
           {manufacturers?.map((manufacturerName) => (
            <MenuItem value={manufacturerName.name}>
             {manufacturerName.name}
            </MenuItem>
           ))}
          </Select>
         </FormControl>
        </Grid>
       </Grid>
       <Grid item xs={6} sm={6}></Grid>
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
export default memo(CreateModelDialog);
