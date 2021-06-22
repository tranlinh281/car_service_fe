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
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { triggerReload } from 'src/actions/userAction';
import { createAccessory } from 'src/actions/accessoryAction';
import { listManufacturer } from 'src/actions/manufacturerAction';

export default function CreateAccessoryDialog() {
 const manufacturerList = useSelector((state) => state.manufacturerList);
 const manufacturers = manufacturerList;
 console.log(manufacturers, 'testing');
 const [open, setOpen] = useState(false);
 const [openConfirm, setOpenConfirm] = useState(false);

 const [name, setName] = useState('');
 const [quantity, setQuantity] = useState(0);
 const [price, setPrice] = useState(0);
 const [unit, setUnit] = useState('');
 const [type, setType] = useState('');
 const [manufacturer, setManufacturer] = useState('');

 const accessoryModels = {
  name: name,
  quantity: quantity,
  price: price,
  unit: unit,
  type: type,
  manufacturer: manufacturer
 };

 const createAccessories = useSelector((state) => state.createAccessories);
 const { success, loading, error } = createAccessories;

 const dispatch = useDispatch();

 const submitHandler = (e) => {
  e.preventDefault();
  console.log(accessoryModels);
  dispatch(createAccessory(accessoryModels));
 };

 const handleClickOpen = () => {
  setOpen(true);
 };
 const handleClose = () => {
  setOpen(false);
 };

 const handleChange = (event) => {
  setGender(event.target.value);
 };

 useEffect(() => {
  dispatch(listManufacturer());
  if (success) {
   console.log(success);
   alert('Thêm thành công');
   setOpen(false);

   dispatch(triggerReload({}));
   //  window.location.reload();
  }
 }, [success]);

 return (
  <>
   <Box
    sx={{
     display: 'flex',
     justifyContent: 'flex-end'
    }}
   >
    <Button variant="contained" color="primary" onClick={handleClickOpen}>
     Thêm Phụ Tùng
    </Button>
   </Box>
   <Dialog
    onClose={handleClose}
    aria-describedby="scroll-dialog-description"
    open={open}
    fullWidth={true}
    maxWidth={'md'}
   >
    <DialogTitle id="customized-dialog-title">Thêm Phụ Tùng</DialogTitle>
    <DialogContent dividers>
     <DialogContentText>
      <Grid container spacing={3}>
       <Grid item xs={12} sm={6}>
        <TextField
         fullWidth
         label="Tên Phụ Tùng"
         margin="normal"
         name="name"
         variant="outlined"
         required
         onChange={(e) => setName(e.target.value)}
        />
        <TextField
         fullWidth
         label="Số Lượng"
         margin="normal"
         name="quantity"
         type="number"
         variant="outlined"
         required
         onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
        <TextField
         fullWidth
         label="Giá "
         margin="normal"
         name="price"
         type="number"
         required
         variant="outlined"
         onChange={(e) => setPrice(parseFloat(e.target.value))}
        />
       </Grid>
       <Grid item xs={6}>
        <TextField
         fullWidth
         label="Đơn vị tính"
         margin="normal"
         name="unit"
         variant="outlined"
         onChange={(e) => setUnit(e.target.value)}
        />
        <FormControl variant="outlined" margin="dense">
         <TextField
          fullWidth
          label="Loại"
          margin="normal"
          name="type"
          variant="outlined"
          onChange={(e) => setType(e.target.value)}
         />
        </FormControl>

        {/* <FormControl variant="outlined" margin='dense'> */}
        <InputLabel>Hãng</InputLabel>
        {manufacturers?.map((manufacturer) => (
         <Select
          value={manufacturer}
          onChange={(e) => setManufacturer(e.target.value)}
          label="Hãng"
         >
          <MenuItem value={manufacturer}>{manufacturer}</MenuItem>
         </Select>
        ))}

        {/* </FormControl> */}
       </Grid>
      </Grid>
      {/* </Form> */}
     </DialogContentText>
    </DialogContent>
    <DialogActions>
     <Button autoFocus onClick={submitHandler} color="primary">
      Lưu
     </Button>
     <Button autoFocus onClick={handleClose} color="secondary">
      Hủy
     </Button>
    </DialogActions>
   </Dialog>
  </>
 );
}
