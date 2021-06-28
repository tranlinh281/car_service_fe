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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { triggerReload } from 'src/actions/userAction';

import { createService, listServiceType } from 'src/actions/serviceAction';

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

 const submitHandler = (e) => {
  e.preventDefault();
  dispatch(createService(serviceModels));
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

 return (
  <>
   <Dialog
    onClose={onClose}
    aria-describedby="scroll-dialog-description"
    open={open}
    maxWidth={'sm'}
   >
    <DialogTitle id="customized-dialog-title" onClose={onClose}>
     Thêm mới dịch vụ
    </DialogTitle>
    <DialogContent dividers>
     <DialogContentText>
      <Grid container spacing={3}>
       <Grid item xs={12} sm={6}>
        <TextField
         fullWidth
         label="Tên Dịch Vụ"
         margin="normal"
         name="name"
         variant="outlined"
         required
         onChange={(e) => setName(e.target.value)}
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
        <Select
         value={type}
         onChange={(e) => setType(e.target.value)}
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
     <Button autoFocus onClick={submitHandler} color="primary" left>
      Lưu
     </Button>
     <Button autoFocus onClick={onClose} color="secondary">
      Hủy
     </Button>
    </DialogActions>
   </Dialog>
  </>
 );
}
