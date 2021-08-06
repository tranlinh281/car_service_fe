import {
 Card,
 CardContent,
 CardMedia,
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
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { Form, Formik } from 'formik';
import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createManufacturer } from 'src/actions/manufacturerAction';
import { DisplayingErrorMessagesManufacturerSchema } from 'src/services/ValidConstants';

const CreateManufacturerDialog = ({ open, onClose }) => {
 const dispatch = useDispatch();

 const [name, setName] = useState();
 const [image, setImage] = useState(null);
 const [url, setURL] = useState('');
 const [progress, setProgress] = useState(0);
 const [errorImage, setErrorImage] = useState('');
 const [imageUrl, setImageUrl] = useState('');
 const [manufacturerModels, setManufacturerModels] = useState();

 const triggerReload = useSelector((state) => state.triggerReload);

 const setForm = ({ name, imageUrl }) => {
  setName(name);
  setImageUrl(imageUrl);
 };

 useEffect(() => {
  setManufacturerModels((prev) => ({
   ...prev,
   name,
   imageUrl
  }));
 }, [name, imageUrl, triggerReload]);
 const submitHandler = async (data) => {
  const imglink = await handleUpdate();
  setImageUrl(imglink);
  const dataNew = {
   ...data,
   imageUrl: imglink
  };
  console.log(dataNew, 'debug manu create');
  //   dispatch(createManufacturer(data));
 };

 const handleReset = () => {};
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
     .ref(`web_admin/manufacturers/${image.name}`)
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
    manufacturer: ''
   }}
   validationSchema={DisplayingErrorMessagesManufacturerSchema}
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
     maxWidth={'xs'}
     fullWidth={true}
    >
     <Form>
      <DialogTitle id="customized-dialog-title" onClose={onClose}>
       Thêm mới Hãng xe
      </DialogTitle>

      <DialogContent dividers>
       {/* <DialogContentText> */}
       <Grid item>
        <TextField
         fullWidth
         label="Tên Hãng"
         error={!!errors.manufacturer}
         helperText={errors.manufacturer}
         margin="normal"
         name="manufacturer"
         variant="outlined"
         value={values.manufacturer}
         onBlur={handleBlur}
         onChange={handleChange}
        />
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
      </DialogContent>
      <DialogActions>
       <Button type="submit" color="primary" left>
        Lưu
       </Button>
       <Button onClick={onClose} type="reset" color="secondary">
        Hủy
       </Button>
      </DialogActions>
     </Form>
    </Dialog>
   )}
  </Formik>
 );
};
export default memo(CreateManufacturerDialog);
