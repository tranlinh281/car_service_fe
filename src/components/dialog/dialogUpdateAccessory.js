import {
 Button,
 Dialog,
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
import { memo, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAccessory } from 'src/actions/accessoryAction';
import { DisplayingErrorMessagesCreateAccessorySchema } from 'src/services/ValidConstants';
import { Form, Formik } from 'formik';

const DialogUpdateAccessory = ({ data, open, onClose }) => {
 const dispatch = useDispatch();
 const { manufacturers } = useSelector((state) => state.manufacturerList);
 const { types } = useSelector((state) => state.accessoryTypeList);

 const [name, setName] = useState();
 const [id, setId] = useState();
 const [quantity, setQuantity] = useState();
 const [price, setPrice] = useState();
 const [unit, setUnit] = useState();
 const [type, setType] = useState();
 const [manufacturer, setManufacturer] = useState();
 const [accessoryModels, setAccessoryModels] = useState();

 const setForm = ({ id, name, quantity, price, unit, type, manufacturer }) => {
  setName(name);
  setId(id);
  setQuantity(quantity);
  setPrice(price);
  setUnit(unit);
  setType(type);
  setManufacturer(manufacturer);
 };

 useEffect(() => {
  setAccessoryModels((prev) => ({
   ...prev,
   id,
   name,
   quantity,
   price,
   unit,
   type,
   manufacturer
  }));
 }, [id, name, quantity, price, unit, type, manufacturer]);

 useEffect(() => {
  if (data && open) {
   setForm(data);
   setAccessoryModels(data);
  }
 }, [data, open]);

 const submitHandler = (data) => {
  console.log(data);
  //   dispatch(updateAccessory(data));
 };

 return (
  <Formik
   initialValues={{
    name: '',
    quantity: '',
    price: '',
    unit: '',
    type: '',
    manufacturer: ''
   }}
   validationSchema={DisplayingErrorMessagesCreateAccessorySchema}
   validateOnChange
   validateOnBlur
   onSubmit={submitHandler}
  >
   {({ errors, handleBlur, handleChange, values }) => (
    <Dialog
     onClose={onClose}
     aria-describedby="scroll-dialog-description"
     open={open}
     maxWidth={'sm'}
    >
     <Form>
      <DialogTitle id="customized-dialog-title" onClose={onClose}>
       Phụ Tùng{' '}
       <span>
        <strong>{data.name || ''}</strong>
       </span>
      </DialogTitle>
      <DialogContent dividers>
       <DialogContentText>
        <Grid container spacing={3}>
         <Grid item xs={12} sm={6}>
          <TextField
           fullWidth
           label="Tên Phụ Tùng"
           margin="normal"
           error={!!errors.name}
           helperText={errors.name}
           value={values.name}
           onBlur={handleBlur}
           onChange={handleChange}
           defaultValue={data.name}
           name="name"
           variant="outlined"
          />
          <TextField
           fullWidth
           label="Số Lượng"
           margin="normal"
           error={!!errors.quantity}
           helperText={errors.quantity}
           value={values.quantity}
           onBlur={handleBlur}
           onChange={handleChange}
           defaultValue={data.quantity}
           name="quantity"
           variant="outlined"
           InputLabelProps={{
            shrink: true
           }}
          />

          <TextField
           fullWidth
           label="Đơn Giá"
           margin="normal"
           error={!!errors.price}
           helperText={errors.price}
           value={values.price}
           onBlur={handleBlur}
           onChange={handleChange}
           defaultValue={data.price}
           name="price"
           variant="outlined"
           InputLabelProps={{
            shrink: true
           }}
          />
         </Grid>
         <Grid item xs={6}>
          <TextField
           fullWidth
           label="Đơn vị tính"
           margin="normal"
           error={!!errors.unit}
           helperText={errors.unit}
           value={values.unit}
           onBlur={handleBlur}
           onChange={handleChange}
           defaultValue={data.unit}
           name="unit"
           variant="outlined"
           InputLabelProps={{
            shrink: true
           }}
          />
          <FormControl variant="outlined" margin="dense">
           <InputLabel>Loai</InputLabel>
           <Select
            name="type"
            value={values.type}
            onChange={handleChange}
            defaultValue={data.type}
            label="Loại"
           >
            {types?.map((type) => (
             <MenuItem value={type.name}>{type.name}</MenuItem>
            ))}
           </Select>
          </FormControl>
          <FormControl variant="outlined" margin="dense">
           <InputLabel>Hãng</InputLabel>
           <Select
           name="manufacturer"
           value={values.manufacturer}
           onChange={handleChange}
            defaultValue={data.manufacturer}
            label="Hãng"
           >
            {manufacturers?.map((manufacturer) => (
             <MenuItem value={manufacturer.name}>{manufacturer.name}</MenuItem>
            ))}
           </Select>
          </FormControl>
         </Grid>
        </Grid>
       </DialogContentText>
      </DialogContent>
      <DialogActions color="red">
       <Button autoFocus type="submit" color="primary" left>
        Lưu
       </Button>
       <Button autoFocus onClick={onClose} color="secondary">
        Hủy
       </Button>
      </DialogActions>
     </Form>
    </Dialog>
   )}
  </Formik>
 );
};

export default memo(DialogUpdateAccessory);
