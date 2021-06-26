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

 const submitHandler = (e) => {
  e.preventDefault();
  dispatch(updateAccessory(accessoryModels));
 };

 return (
  <Dialog
   onClose={onClose}
   aria-describedby="scroll-dialog-description"
   open={open}
   maxWidth={'sm'}
  >
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
        value={name}
        defaultValue={data.name}
        onChange={(e) => setName(e.target.value)}
        name="name"
        variant="outlined"
       />
       <TextField
        fullWidth
        label="Số Lượng"
        margin="normal"
        value={quantity}
        defaultValue={data.quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
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
        value={price}
        defaultValue={data.price}
        onChange={(e) => setPrice(parseFloat(e.target.value))}
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
        value={unit}
        defaultValue={data.unit}
        onChange={(e) => setUnit(e.target.value)}
        name="unit"
        variant="outlined"
        InputLabelProps={{
         shrink: true
        }}
       />
       <FormControl variant="outlined" margin="dense">
        <InputLabel>Loai</InputLabel>
        <Select
         value={type}
         defaultValue={data.type}
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
         defaultValue={data.manufacturer}
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
 );
};

export default memo(DialogUpdateAccessory);
