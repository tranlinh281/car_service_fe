import {
 Button,
 Card,
 CardContent,
 CardMedia,
 Dialog,
 DialogActions,
 DialogContent,
 DialogContentText,
 DialogTitle,
 FormControl,
 FormHelperText,
 Grid,
 InputLabel,
 MenuItem,
 Select,
 TextField,
 Typography
} from '@material-ui/core';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { Form, Formik } from 'formik';
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAccessory } from 'src/actions/accessoryAction';
import { listAllManufacturer } from 'src/actions/manufacturerAction';
import { listServiceType } from 'src/actions/serviceAction';
import { DisplayingErrorMessagesCreateAccessorySchema } from 'src/services/ValidConstants';
import { storage } from '../../firebase/index';
import Resizer from 'react-image-file-resizer';

const DialogCreateAccessory = ({ data, open, onClose }) => {
 const dispatch = useDispatch();
 const { manufacturers } = useSelector((state) => state.manufacturerListAll);
 const { types } = useSelector((state) => state.typeList);

 const [name, setName] = useState();
 const [id, setId] = useState();
 const [quantity, setQuantity] = useState();
 const [price, setPrice] = useState();
 const [unit, setUnit] = useState();

 const [type, setType] = useState();
 const [manufacturer, setManufacturer] = useState();
 const [accessoryModels, setAccessoryModels] = useState();
 const [image, setImage] = useState(null);
 const [url, setURL] = useState('');
 const [progress, setProgress] = useState(0);
 const [errorImage, setErrorImage] = useState('');
 const [imageUrl, setImageUrl] = useState('');

 const triggerReload = useSelector((state) => state.triggerReload);

 const setForm = ({
  id,
  name,
  quantity,
  price,
  unit,
  type,
  manufacturer,
  imageUrl
 }) => {
  setName(name);
  setId(id);
  setQuantity(quantity);
  setPrice(price);
  setUnit(unit);
  setType(type);
  setManufacturer(manufacturer);
  setImageUrl(imageUrl);
 };

 useEffect(() => {
  dispatch(listAllManufacturer());
  dispatch(listServiceType());
  setAccessoryModels((prev) => ({
   ...prev,
   id,
   name,
   quantity,
   price,
   unit,
   type,
   manufacturer,
   imageUrl
  }));
 }, [
  id,
  name,
  quantity,
  price,
  unit,
  type,
  manufacturer,
  imageUrl,
  triggerReload
 ]);

 useEffect(() => {
  if (data && open) {
   setForm(data);
   setAccessoryModels(data);
  }
 }, [data, open]);

 const submitHandler = async (data) => {
  const imglink = await handleUpdate();
  setImageUrl(imglink);
  const dataNew = {
   ...data,
   imageUrl: imglink
  };
  dispatch(createAccessory(dataNew));
 };

 var handleReset = () => {
  setURL('');
 };

 const handleChangeImage = async (e) => {
  const file = e.target.files[0];
  if (file) {
   const fileType = file['type'];
   const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
   if (validImageTypes.includes(fileType)) {
    setErrorImage('');
    setImage(file);
    // setImageUrl(file);
    setURL(URL.createObjectURL(file));
   } else {
    setErrorImage('Định dạng hình ảnh không hợp lệ! Hãy chọn lại!');
   }
  }
 };

 const handleUpdate = async () => {
  return new Promise((resolve, reject) => {
   if (image) {
    const uploadImgTask = storage
     .ref(`web_admin/accessories/${image.name}`)
     .put(image);

    uploadImgTask.on(
     'state_changed',
     (snapshot) => {},
     (error) => {
      console.log(error),
       reject('Hình ảnh không lưu được trên firebase: ' + error);
     },
     () => {
      storage
       .ref('web_admin/accessories')
       .child(`${image.name}`)
       .getDownloadURL()
       .then((urls) => {
        setImageUrl(urls), resolve(urls);
       });
     }
    );
   } else {
    setErrorImage('Hình ảnh không được bỏ trống!');
   }
  });
 };

 return (
  <Formik
   initialValues={{
    name: '',
    quantity: '',
    price: '',
    unit: '',
    type: '',
    manufacturer: '',
    imageUrl: ''
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
     maxWidth={'md'}
    >
     <Form>
      {' '}
      <DialogTitle id="customized-dialog-title" onClose={onClose}>
       Thêm mới Phụ Tùng
      </DialogTitle>
      <DialogContent dividers>
       <DialogContentText>
        <Grid container spacing={3}>
         <Grid item xs={6}>
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
         </Grid>
         <Grid item xs={12} sm={6}>
          <Grid item container spacing={2}>
           <Grid item xs={6} sm={6}>
            <FormControl
             variant="outlined"
             margin="normal"
             fullWidth
             error={!!errors.type}
            >
             <InputLabel>Phân Loại</InputLabel>
             <Select
              name="type"
              value={values.type}
              onChange={handleChange}
              label="Phân Loại"
             >
              {types?.map((type) => (
               <MenuItem value={type.name}>{type.name}</MenuItem>
              ))}
             </Select>

             <FormHelperText>{errors.type}</FormHelperText>
            </FormControl>
           </Grid>

           <Grid item xs={6} sm={6}>
            <FormControl
             variant="outlined"
             margin="normal"
             fullWidth
             error={!!errors.manufacturer}
            >
             <InputLabel>Hãng</InputLabel>
             <Select
              name="manufacturer"
              value={values.manufacturer}
              onChange={handleChange}
              label="Hãng"
             >
              {manufacturers?.map((manufacturer) => (
               <MenuItem value={manufacturer.name}>
                {manufacturer.name}
               </MenuItem>
              ))}
             </Select>

             <FormHelperText>{errors.manufacturer}</FormHelperText>
            </FormControl>
           </Grid>
          </Grid>
          <Card style={{ display: 'flex' }}>
           <CardContent style={{ flex: '1 0 auto' }}>
            <Typography variant="subtitle1" color="textSecondary">
             Hình ảnh
            </Typography>
            <Grid container justify="center" alignItems="center">
             <input
              id="contained-button-file"
              type="file"
              style={{ display: 'none' }}
              onChange={(e) => {
               handleChangeImage(e);
              }}
             />
             <label htmlFor="contained-button-file">
              <AddPhotoAlternateIcon />
             </label>
            </Grid>
            {/* <Typography variant="subtitle1" color="textSecondary">
                          <button onClick={handleUpdate}>UpLoad</button>
                        </Typography> */}
           </CardContent>

           <CardMedia style={{ width: '130px', height: '130px' }}>
            {url ? (
             <img
              style={{ width: '130px', height: '130px' }}
              src={url}
              className="App-logo"
              alt="logo"
             />
            ) : (
             <img
              style={{ width: '130px', height: '130px' }}
              src={url}
              className="App-logo"
              // alt="logone"
             />
            )}
           </CardMedia>
          </Card>
          {/* <Card>
           <CardContent>
            <Grid container justify="center" alignItems="center">
             <input
              accept="image/*"
              style={{ display: 'none' }}
              id="contained-button-file"
              multiple
              type="file"
              onChange={this.handleUploadClick}
             />
             <label htmlFor="contained-button-file">
              <AddPhotoAlternateIcon />
             </label>
            </Grid>
           </CardContent>
          </Card> */}
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
