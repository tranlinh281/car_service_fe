import {
 DialogActions,
 DialogContent,
 Autocomplete,
 DialogTitle,
 FormControl,
 FormHelperText,
 Grid,
 InputLabel,
 MenuItem,
 Select,
 TextField,
 Card,
 CardContent,
 Typography,
 CardMedia
} from '@material-ui/core';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { storage } from '../../firebase/index';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { FieldArray, Form, Formik } from 'formik';
import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
 createModel,
 listAllManufacturer
} from 'src/actions/manufacturerAction';
import { DisplayingErrorMessagesModelSchema } from 'src/services/ValidConstants';

const CreateModelDialog = ({ open, onClose }) => {
 const { manufacturers } = useSelector((state) => state.manufacturerListAll);
 const [image, setImage] = useState(null);
 const [url, setURL] = useState('');
 const [progress, setProgress] = useState(0);
 const [errorImage, setErrorImage] = useState('');
 const [imageUrl, setImageUrl] = useState('');
 const dispatch = useDispatch();

 useEffect(() => {
  dispatch(listAllManufacturer());
 }, [listAllManufacturer]);

 const submitHandler = async (modelsT) => {
  const imglink = await handleUpdate();
  setImageUrl(imglink);
  const dataNew = {
   ...modelsT,
   imageUrl: imglink
  };

  console.log(dataNew, 'debug create model');
  //dispatch(createModel(dataNew));
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
     .ref(`web_admin/models/${image.name}`)
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
       .ref('web_admin/models')
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
    manufacturerName: '',
    models: [{ name, imageUrl }]
   }}
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
       Thêm mới Loại xe
      </DialogTitle>

      <DialogContent dividers>
       <Grid>
        <FormControl variant="outlined" margin="normal" fullWidth>
         <InputLabel>Hãng</InputLabel>
         <Select
          name="manufacturerName"
          value={values.manufacturerName}
          onChange={handleChange}
          label="Hãng"
         >
          {manufacturers?.map((manufacturerName) => (
           <MenuItem value={manufacturerName.name}>
            {manufacturerName.name}
           </MenuItem>
          ))}
         </Select>
        </FormControl>

        <Grid item>
         <FieldArray
          name="models"
          render={(arrayHelpers) => {
           const models = values.models;
           return (
            <div>
             {models.map((item, index) => (
              <Grid>
               <TextField
                fullWidth
                label="Tên Loại xe"
                margin="normal"
                name={`models.${index}.name`}
                variant="outlined"
                value={models[`${index}`].name}
                onBlur={handleBlur}
                onChange={handleChange}
               />
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
              </Grid>
             ))}
            </div>
           );
          }}
         />
        </Grid>
       </Grid>
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
export default memo(CreateModelDialog);
