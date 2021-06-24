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
import { updateService } from 'src/actions/serviceAction';

export default function EditServiceDialog(props) {
 toast.configure({
  autoClose: 2000,
  draggable: false,
  position: toast.POSITION.BOTTOM_RIGHT
 });
 const notify = () => toast('Cập nhật Thành công!');
 const errorNoti = () => toast('Cập nhật Thành công!');
 const typeList = useSelector((state) => state.typeList);
 const { types } = typeList;
 const { dataFromParent } = props;
 const [dialogPopup, setDialogPopup] = useState({
  isOpen: false,
  title: '',
  subTitle: ''
 });

 const [name, setName] = useState(dataFromParent.name);
 const [id, setId] = useState(dataFromParent.id);
 const [price, setPrice] = useState(dataFromParent.price);
 const [type, setType] = useState(dataFromParent.type);

 const [open, setOpen] = useState(false);
 const [openConfirm, setOpenConfirm] = useState(false);


 const serviceModels = {
  id: id,
  name: name,
  price: price,
  type: type,
 };

 const editService = useSelector((state) => state.editService);
 const { success, loading, error, test } = editService;

 const dispatch = useDispatch();

 const submitHandler = (e) => {
  e.preventDefault();
  dispatch(updateService(serviceModels));
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
        <InputLabel>Loại</InputLabel>

        <Select
         value={type}
         onChange={(e) => setType(e.target.value)}
         label="Loại"
        >
         {types?.map((type) => (
          <MenuItem value={type.name}>{type.name}</MenuItem>
         ))}
        </Select>
        {/* </FormControl> */}
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
