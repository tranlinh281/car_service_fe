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
 TextField,
 Card,
 CardContent,
 CardMedia,
 Typography
} from '@material-ui/core';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { Form, Formik } from 'formik';
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAccessory } from 'src/actions/accessoryAction';
import { storage } from 'src/firebase';
import { DisplayingErrorMessagesCreateAccessorySchema } from 'src/services/ValidConstants';

const DialogUpdateAccessory = ({ data, open, onClose }) => {
 const dispatch = useDispatch();

 const { manufacturers } = useSelector((state) => state.manufacturerListAll);
 const { types } = useSelector((state) => state.typeList);

 const [initialFormikValues, setInitialFormikValues] = useState({});
 const [image, setImage] = useState(null);
 const [url, setURL] = useState();
 const [progress, setProgress] = useState(0);
 const [errorImage, setErrorImage] = useState('');
 const [imageUrl, setImageUrl] = useState('');

 const [changeImg, setChangeImg] = useState(false);

 console.log(data.imageUrl);
 useEffect(() => {
  if (open) {
   setInitialFormikValues(data);
  }
 }, [data, open]);

 const submitHandler = async (data) => {
  if (changeImg == false) {
   const parsedData = {
    ...data,
    quantity: parseInt(data.quantity),
    price: parseFloat(data.price),
    imageUrl: data.imageUrl
   };
   dispatch(updateAccessory(parsedData));
  } else {
   const imglink = await handleUpdate();
   const parsedData = {
    ...data,
    quantity: parseInt(data.quantity),
    price: parseFloat(data.price),
    imageUrl: imglink
   };
   dispatch(updateAccessory(parsedData));
  }
 };

 const handleChangeImage = (e) => {
  setChangeImg(true);
  const file = e.target.files[0];
  if (file) {
   const fileType = file['type'];
   const validImageTypes = [
    'image/gif',
    'image/jpeg',
    'image/png',
    'image/jpg'
   ];
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
   enableReinitialize
   initialValues={initialFormikValues}
   validationSchema={DisplayingErrorMessagesCreateAccessorySchema}
   validateOnChange
   validateOnBlur
   onSubmit={submitHandler}
  >
   {({ resetForm, ...props }) => {
    useEffect(() => {
     if (open) {
      resetForm();
     }
    }, [open]);

    return (
     <Dialog
      onClose={onClose}
      aria-describedby="scroll-dialog-description"
      open={open}
      maxWidth={'md'}
      fullWidth={true}
     >
      <Form>
       <DialogTitle id="customized-dialog-title" onClose={onClose}>
        Phụ Tùng
        <span>
         <strong>{data.name || ''}</strong>
        </span>
       </DialogTitle>
       <DialogContent dividers>
        <Grid container spacing={3}>
         <Grid item xs={6}>
          <TextField
           fullWidth
           label="Tên Phụ Tùng"
           margin="normal"
           error={!!props.errors.name}
           helperText={props.errors.name}
           value={props.values.name}
           onBlur={props.handleBlur}
           onChange={props.handleChange}
           name="name"
           variant="outlined"
          />

          <TextField
           fullWidth
           label="Số Lượng"
           margin="normal"
           error={!!props.errors.quantity}
           helperText={props.errors.quantity}
           value={props.values.quantity}
           onBlur={props.handleBlur}
           onChange={props.handleChange}
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
           error={!!props.errors.price}
           helperText={props.errors.price}
           value={props.values.price}
           onBlur={props.handleBlur}
           onChange={props.handleChange}
           name="price"
           variant="outlined"
           InputLabelProps={{
            shrink: true
           }}
          />
          <TextField
           fullWidth
           label="Đơn vị tính"
           margin="normal"
           error={!!props.errors.unit}
           helperText={props.errors.unit}
           value={props.values.unit}
           onBlur={props.handleBlur}
           onChange={props.handleChange}
           name="unit"
           variant="outlined"
           InputLabelProps={{
            shrink: true
           }}
          />
         </Grid>
         <Grid item xs={12} sm={6}>
          <Grid item container spacing={2}>
           <Grid item xs={6} sm={6}>
            <FormControl variant="outlined" margin="normal" fullWidth>
             <InputLabel>Phân Loại</InputLabel>
             <Select
              name="type"
              value={props.values.type}
              onChange={props.handleChange}
              defaultValue={data.type}
              label="Phân Loại"
             >
              {types?.map((type) => (
               <MenuItem value={type.name}>{type.name}</MenuItem>
              ))}
             </Select>
            </FormControl>
           </Grid>
           <Grid item xs={6} sm={6}>
            <FormControl variant="outlined" margin="normal" fullWidth>
             <InputLabel>Hãng</InputLabel>
             <Select
              name="manufacturer"
              value={props.values.manufacturer}
              onChange={props.handleChange}
              defaultValue={data.manufacturer}
              label="Hãng"
             >
              {manufacturers?.map((manufacturer) => (
               <MenuItem value={manufacturer.name}>
                {manufacturer.name}
               </MenuItem>
              ))}
             </Select>
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
              onChange={handleChangeImage}
             />
             <label htmlFor="contained-button-file">
              <AddPhotoAlternateIcon />
             </label>
            </Grid>
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
              src={data.imageUrl}
              className="App-logo"
              // alt="logone"
             />
            )}
           </CardMedia>
          </Card>
         </Grid>
        </Grid>
       </DialogContent>
       <DialogActions color="red">
        <Button autoFocus onClick={onClose} color="secondary">
         Hủy
        </Button>
        <Button autoFocus type="submit" color="primary" left>
         Lưu
        </Button>
       </DialogActions>
      </Form>
     </Dialog>
    );
   }}
  </Formik>
 );
};

export default memo(DialogUpdateAccessory);
