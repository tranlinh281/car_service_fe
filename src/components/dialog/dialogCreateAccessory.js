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
 listTypeAccessory,
 updateAccessory
} from 'src/actions/accessoryAction';
import { listManufacturer } from 'src/actions/manufacturerAction';

const DialogCreateAccessory = ({ data, open, onClose }) => {
 const dispatch = useDispatch();
 const { manufacturers } = useSelector((state) => state.manufacturerList);
 const { types } = useSelector((state) => state.accessoryTypeList);
 // Thật ra cái này nó log vậy đúng ròi tại cái manu với cái type nó lấy từ API, nên khi mà nó có data thì component này được render lại nên log lại
 // ok vậy ổn hử? ổn cái log ở ngoài này thì chỉ là khi component nó render lại nó log thôi nên bình thường, khi nào nó chạy gì đó trong useeffect nhiều
 // Thì lúc đó mới có vấn đề
 //ok vậy bỏ qua. Nãy lúc anh làm thì anh k vẫn gọi cái component create accessory cũ, k phải cái dialog, nhưng mà nó hết thông báo lặp, thì như vậy là ntn?
 // là nó chỉ log 1 lần thôi hả hay sao
 // đúng rồi popup success lên là 1 lần rồi thôi out ra vào lại k có hiện, tại sao nhỉ?
 // là sao ta chưa hình dung ra đây để ah mẫu cho :v
 
 console.log(types, 'debug types');
 console.log(manufacturers, 'debug manufacturers');

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
        label="Tên Phụ Tùng"
        margin="normal"
        onChange={(e) => setName(e.target.value)}
        name="name"
        variant="outlined"
       />
       <TextField
        fullWidth
        label="Số Lượng"
        margin="normal"
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
    <Button autoFocus onClick={onClose} color="secondary">
     Hủy
    </Button>
   </DialogActions>
  </Dialog>
 );
};

export default memo(DialogCreateAccessory);
