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
import {
 createManufacturer,
 updateManufacturer
} from 'src/actions/manufacturerAction';
import { storage } from '../../firebase/index';
import { DisplayingErrorMessagesManufacturerSchema } from 'src/services/ValidConstants';

const EditManufacturerDialog = ({ data, open, onClose }) => {
 const dispatch = useDispatch();

 const [initialFormikValues, setInitialFormikValues] = useState({});

 const [image, setImage] = useState(null);
 const [url, setURL] = useState('');
 const [progress, setProgress] = useState(0);
 const [errorImage, setErrorImage] = useState('');
 const [imageUrl, setImageUrl] = useState('');

 const [changeImg, setChangeImg] = useState(false);

 useEffect(() => {
  if (open) {
   setInitialFormikValues(data);
  }
 }, [data, open]);
 const submitHandler = async (data) => {
  if (changeImg == false) {
   const parsedData = {
    ...data,
    imageUrl: data.imageUrl
   };
   dispatch(updateManufacturer(parsedData));
  } else {
   const imglink = await handleUpdate();
   const parsedData = {
    ...data,
    imageUrl: imglink
   };
   dispatch(updateManufacturer(parsedData));
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
       .ref('web_admin/manufacturers')
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
   validationSchema={DisplayingErrorMessagesManufacturerSchema}
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
          error={!!props.errors.name}
          helperText={props.errors.name}
          value={props.values.name}
          margin="normal"
          name="name"
          variant="outlined"
          onBlur={props.handleBlur}
          onChange={props.handleChange}
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
    );
   }}
  </Formik>
 );
};
export default memo(EditManufacturerDialog);
