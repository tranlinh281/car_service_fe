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
import React, { memo, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
 createManufacturer,
 updateManufacturer
} from 'src/actions/manufacturerAction';
import { storage } from '../../firebase/index';
import { DisplayingErrorMessagesManufacturerSchema } from 'src/services/ValidConstants';
import * as constant from 'src/utils/Constants';
import { toast } from 'react-toastify';
import { DialogContext } from 'src/contexts/dialogContexts/DialogUpdateAccessoryContextProvider';

const EditManufacturerDialog = ({ data, open, onClose }) => {
 const dispatch = useDispatch();

 const [initialFormikValues, setInitialFormikValues] = useState({});

 const [image, setImage] = useState(null);
 const [url, setURL] = useState('');
 const [errorImage, setErrorImage] = useState('');
 const [imageUrl, setImageUrl] = useState('');

 const [changeImg, setChangeImg] = useState(false);
 const { setShouldUpdateManufacturerDialogOpen } = useContext(DialogContext);
 useEffect(() => {
  if (open) {
   setInitialFormikValues(data);
  }
 }, [data, open]);
 const submitHandler = async (data) => {
  await setShouldUpdateManufacturerDialogOpen(false);
  await toast.success(constant.POPUP_UPDATE_MANUFACTUER);
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
    setErrorImage(constant.TITLE_ERROR_IMAGE_FORMAT);
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
      console.log(error), reject(constant.TITLE_ERROR_IMAGE + error);
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
    setErrorImage(constant.TITLE_ERROR_IMAGE);
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
        {constant.TITLE_UPDATE_MANUFACTURER}
       </DialogTitle>

       <DialogContent dividers>
        {/* <DialogContentText> */}
        <Grid item>
         <TextField
          fullWidth
          label={constant.LABEL_NAME_MANUFACUTER}
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
           {constant.LABEL_IMAGE}
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
        <Button onClick={onClose} type="reset" color="secondary">
         {constant.TITLE_CANCEL}
        </Button>
        <Button type="submit" color="primary" left>
         {constant.TITLE_SAVE}
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
