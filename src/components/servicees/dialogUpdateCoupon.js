import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Grid, TextField
} from '@material-ui/core';
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCoupon } from 'src/actions/serviceAction';

const DialogUpdateCoupon = ({ data, open, onClose }) => {
 const dispatch = useDispatch();
 const { types } = useSelector((state) => state.typeList);
 const [name, setName] = useState();
 const [id, setId] = useState();
 const [description, setDescription] = useState();
 const [value, setValue] = useState();
 const [pointRequired, setPointRequired] = useState();
 const [serviceId, setServiceId] = useState();
 const [couponModels, setCouponModels] = useState();

 const setForm = ({ id, name, description, value, pointRequired }) => {
  setName(name);
  setServiceId(data.serviceId);
  setId(id);
  setDescription(description);
  setValue(value);
  setPointRequired(pointRequired);
 };

 useEffect(() => {
  setCouponModels((prev) => ({
   ...prev,
   serviceId,
   id,
   name,
   description,
   value,
   pointRequired
  }));
 }, [id, serviceId, name, description, value, pointRequired]);

 useEffect(() => {
  if (data && open) {
   setForm(data);
   setCouponModels(data);
  }
 }, [data, open]);

 const submitHandler = (e) => {
  e.preventDefault();
  console.log(couponModels, 'coupon');
  dispatch(updateCoupon(couponModels));
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
    Khuyến mãi:
    <span>
     <strong>{data.name}</strong>
    </span>
   </DialogTitle>
   <DialogContent dividers>
    <DialogContentText>
     <Grid item>
      <TextField
       fullWidth
       label="Tên Khuyến mãi"
       margin="normal"
       defaultValue={data.name}
       onChange={(e) => setName(e.target.value)}
       name="name"
       variant="outlined"
      />

      <TextField
       fullWidth
       label="Mô tả"
       margin="normal"
       defaultValue={data.description}
       onChange={(e) => setDescription(e.target.value)}
       name="description"
       variant="outlined"
       InputLabelProps={{
        shrink: true
       }}
      />
      <TextField
       fullWidth
       label="Phần trăm"
       margin="normal"
       defaultValue={data.value}
       onChange={(e) => setValue(parseFloat(e.target.value))}
       name="value"
       variant="outlined"
       InputLabelProps={{
        shrink: true
       }}
      />
      <TextField
       fullWidth
       label="Điểm"
       margin="normal"
       defaultValue={data.pointRequired}
       onChange={(e) => setPointRequired(parseFloat(e.target.value))}
       name="pointRequired"
       variant="outlined"
       InputLabelProps={{
        shrink: true
       }}
      />
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

export default memo(DialogUpdateCoupon);
