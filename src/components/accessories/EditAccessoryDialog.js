import React from 'react';
import {
 DialogActions,
 DialogContent,
 DialogContentText,
 Grid,
 TextField,
 IconButton,
 Button,
 Dialog,
 Typography,
 DialogTitle,
 FormControl,
 Select,
 InputLabel,
 MenuItem
} from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import PopupDialog from '../dialog/dialogPopup';
import { useDispatch, useSelector } from 'react-redux';
import { updateEmployee, triggerReload } from 'src/actions/userAction';
import ButtonAction from '../ButtonAction';
import { Edit, Close } from '@material-ui/icons';
import { updateAccessory } from 'src/actions/accessoryAction';

export default function EditAccessoryDialog(props) {
 toast.configure({
  autoClose: 2000,
  draggable: false,
  position: toast.POSITION.BOTTOM_RIGHT
 });
 const notify = () => toast('Cập nhật Thành công!');
 const errorNoti = () => toast('Cập nhật Thành công!');
 const manufacturerList = useSelector((state) => state.manufacturerList);
 const { manufacturers } = manufacturerList;
 const accessoryTypeList = useSelector((state) => state.accessoryTypeList);
 const { types } = accessoryTypeList;
 const { dataFromParent } = props;
 const [dialogPopup, setDialogPopup] = useState({
  isOpen: false,
  title: '',
  subTitle: ''
 });

 const [name, setName] = useState(dataFromParent.name);
 const [id, setId] = useState(dataFromParent.id);
 const [quantity, setQuantity] = useState(dataFromParent.quantity);
 const [price, setPrice] = useState(dataFromParent.price);
 const [unit, setUnit] = useState(dataFromParent.unit);
 const [type, setType] = useState(dataFromParent.type);
 const [manufacturer, setManufacturer] = useState(dataFromParent.manufacturer);

 const [open, setOpen] = useState(false);
 const [openConfirm, setOpenConfirm] = useState(false);
 const [role, setRole] = useState();

 const accessoryModels = {
  id: id,
  name: name,
  quantity: quantity,
  price: price,
  unit: unit,
  type: type,
  manufacturer: manufacturer
 };

 const editAccessory = useSelector((state) => state.editAccessory);
 const { success, loading, error, test } = editAccessory;

 const dispatch = useDispatch();

 const submitHandler = (e) => {
  e.preventDefault();
  dispatch(updateAccessory(accessoryModels));
 };

 const handleClickOpen = () => {
  setOpen(true);
 };

 const handleClose = () => {
  setOpen(false);
 };

 useEffect(() => {
  if (success) {
   console.log(success);
   setOpen(false);
   notify(true);
  } else if (error) {
   errorNoti(true);
  }
 }, [success]);

 return (
  <>
   <ButtonAction variant="contained" color="primary" onClick={handleClickOpen}>
    <Edit fontSize="small" />
   </ButtonAction>

   <Dialog
    onClose={handleClose}
    aria-describedby="scroll-dialog-description"
    open={open}
    // fullWidth={true}
    maxWidth={'sm'}
   >
    <DialogTitle id="customized-dialog-title" onClose={handleClose}>
     Phụ Tùng{' '}
     <span>
      <strong>{dataFromParent.name}</strong>
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
         onChange={(e) => setName(e.target.value)}
         name="name"
         variant="outlined"
        />
        <TextField
         fullWidth
         label="Số Lượng"
         margin="normal"
         value={quantity}
         onChange={(e) => setQuantity(e.target.value)}
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
         onChange={(e) => setPrice(e.target.value)}
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
     <Button autoFocus onClick={handleClose} color="secondary">
      Hủy
     </Button>
    </DialogActions>
   </Dialog>
   <PopupDialog dialogPopup={dialogPopup} setDialogPopup={setDialogPopup} />
  </>
 );
}
