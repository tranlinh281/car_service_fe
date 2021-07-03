import {
 Button,
 Dialog,
 DialogActions,
 DialogContent,
 DialogContentText,
 DialogTitle,
 Grid,
 InputLabel,
 MenuItem,
 Select,
 TextField
} from '@material-ui/core';
import { memo, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
 createAccessory,
 listTypeAccessory
} from 'src/actions/accessoryAction';
import { Form, Formik } from 'formik';
import { listManufacturer } from 'src/actions/manufacturerAction';
import { DisplayingErrorMessagesCreateAccessorySchema } from 'src/services/ValidConstants';

const DialogCreateAccessory = ({ data, open, onClose }) => {
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
 const triggerReload = useSelector((state) => state.triggerReload);

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
  dispatch(listManufacturer());
  dispatch(listTypeAccessory());
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
 }, [id, name, quantity, price, unit, type, manufacturer, triggerReload]);

 useEffect(() => {
  if (data && open) {
   setForm(data);
   setAccessoryModels(data);
  }
 }, [data, open]);

 const submitHandler = (data) => {
  console.log(data);
  dispatch(createAccessory(data));
 };

 var handleReset = () => {};

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
      {' '}
      <DialogTitle id="customized-dialog-title" onClose={onClose}>
       Thêm mới Phụ Tùng
      </DialogTitle>
      <DialogContent dividers>
       <DialogContentText>
        <Grid container spacing={3}>
         <Grid item xs={12} sm={6}>
          <TextField
           fullWidth
           error={!!errors.name}
           helperText={errors.name}
           label="Tên Phụ Tùng"
           margin="normal"
           name="name"
           value={values.name}
           onBlur={handleBlur}
           onChange={handleChange}
           required
           variant="outlined"
          />
          <TextField
           fullWidth
           label="Số Lượng"
           error={!!errors.quantity}
           helperText={errors.quantity}
           margin="normal"
           value={values.quantity}
           required
           type="number"
           onBlur={handleBlur}
           onChange={handleChange}
           name="quantity"
           variant="outlined"
          />

          <TextField
           fullWidth
           label="Đơn Giá"
           error={!!errors.price}
           helperText={errors.price}
           margin="normal"
           value={values.price}
           type="number"
           onBlur={handleBlur}
           onChange={handleChange}
           name="price"
           variant="outlined"
          />
         </Grid>
         <Grid item xs={6}>
          <TextField
           fullWidth
           label="Đơn vị tính"
           error={!!errors.unit}
           helperText={errors.unit}
           margin="normal"
           value={values.unit}
           onBlur={handleBlur}
           onChange={handleChange}
           name="unit"
           variant="outlined"
          />
          <InputLabel>Loai</InputLabel>
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
          <InputLabel>Hãng</InputLabel>
          <Select
           name="manufacturer"
           value={values.manufacturer}
           onChange={handleChange}
           label="Hãng"
          >
           {manufacturers?.map((manufacturer) => (
            <MenuItem value={manufacturer.name}>{manufacturer.name}</MenuItem>
           ))}
          </Select>
         </Grid>
        </Grid>
       </DialogContentText>
      </DialogContent>
      <DialogActions color="red">
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
 );
};

export default memo(DialogCreateAccessory);
