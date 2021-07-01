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
import {
 createAccessory,
 listTypeAccessory
} from 'src/actions/accessoryAction';
import { listManufacturer } from 'src/actions/manufacturerAction';
import { Formik } from 'formik';
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
 }, [id, name, quantity, price, unit, type, manufacturer]);

 useEffect(() => {
  if (data && open) {
   setForm(data);
   setAccessoryModels(data);
  }
 }, [data, open]);

 const submitHandler = (e) => {
  e.preventDefault();
  dispatch(createAccessory(accessoryModels));
 };

 return (
  <Formik
   initialValues={{

   }}
   validationSchema={DisplayingErrorMessagesCreateAccessorySchema}
   validateOnChange
   validateOnBlur
  >
   {({ errors, handleBlur, handleChange }) => (
    <Dialog
     onClose={onClose}
     aria-describedby="scroll-dialog-description"
     open={open}
     maxWidth={'sm'}
    >
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
          onChange={(e) => setName(e.target.value)}
          name="name"
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
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          required
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
          onChange={(e) => setPrice(parseFloat(e.target.value))}
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
          onChange={(e) => setUnit(e.target.value)}
          onBlur={handleBlur}
          onChange={handleChange}
          name="unit"
          variant="outlined"
         />
         <FormControl variant="outlined" margin="dense">
          <InputLabel>Loai</InputLabel>
          <Select
           value={type}
           onChange={(e) => setType(e.target.value)}
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
           value={manufacturer}
           onChange={(e) => setManufacturer(e.target.value)}
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
      <Button autoFocus onClick={submitHandler} color="primary" left>
       Lưu
      </Button>
      <Button autoFocus onClick={onClose} color="secondary">
       Hủy
      </Button>
     </DialogActions>
    </Dialog>
   )}
  </Formik>
 );
};

export default memo(DialogCreateAccessory);
