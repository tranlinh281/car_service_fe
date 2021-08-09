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
import { updateService } from 'src/actions/serviceAction';

const DialogUpdateService = ({ data, open, onClose }) => {
 const dispatch = useDispatch();
 const { types } = useSelector((state) => state.typeList);
 const [name, setName] = useState();
 const [id, setId] = useState();
 const [price, setPrice] = useState();
 const [type, setType] = useState();
 const [serviceModels, setServiceModels] = useState();

 const setForm = ({ id, name, price, type }) => {
  setName(name);
  setId(id);
  setPrice(price);
  setType(type);
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

 const submitHandler = (e) => {
  e.preventDefault();
  console.log(e, 'service');
  dispatch(updateService(serviceModels));
 };

 return (
  <Dialog
   onClose={onClose}
   aria-describedby="scroll-dialog-description"
   open={open}
   maxWidth={'xs'}
   fullWidth={true}
  >
   <DialogTitle id="customized-dialog-title" onClose={onClose}>
    Dịch vụ:
    <span>
     <strong>{data.name}</strong>
    </span>
   </DialogTitle>
   <DialogContent dividers>
    <DialogContentText>
     <Grid item>
      <TextField
       fullWidth
       label="Tên Dịch vụ"
       margin="normal"
       defaultValue={data.name}
       onChange={(e) => setName(e.target.value)}
       name="name"
       variant="outlined"
      />

      <TextField
       fullWidth
       label="Đơn Giá"
       margin="normal"
       defaultValue={data.price}
       onChange={(e) => setPrice(parseFloat(e.target.value))}
       name="price"
       variant="outlined"
       InputLabelProps={{
        shrink: true
       }}
      />
      <FormControl variant="outlined" margin="normal" fullWidth>
       <InputLabel>Phân Loại</InputLabel>

       <Select
        defaultValue={data.type}
        onChange={(e) => setType(e.target.value)}
        label="Phân Loại"
       >
        {types?.map((type) => (
         <MenuItem value={type.name}>{type.name}</MenuItem>
        ))}
       </Select>
      </FormControl>
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

export default memo(DialogUpdateService);
