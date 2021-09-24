import {
 Card,
 CardContent,
 CardMedia,
 DialogActions,
 DialogContent,
 DialogTitle,
 Grid,
 TextField,
 Typography
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { FieldArray, Form, Formik } from 'formik';
import React, { memo, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
 createModel,
 listAllManufacturer
} from 'src/actions/manufacturerAction';
import { DialogContext } from 'src/contexts/dialogContexts/DialogUpdateAccessoryContextProvider';
import * as constant from 'src/utils/Constants';
import { storage } from '../../firebase/index';

const CreateModelDialog = ({ data, open, onClose }) => {
 console.log(data.name);
 const { manufacturers } = useSelector((state) => state.manufacturerListAll);
 const [image, setImage] = useState(null);
 const [url, setURL] = useState('');
 const [progress, setProgress] = useState(0);
 const [errorImage, setErrorImage] = useState('');
 const [imageUrl, setImageUrl] = useState('');
 const [nameModel, setNameModel] = useState('');
 const [imageShow, setImageShow] = useState();
 const [manufacturerName, setManufacturerName] = useState(data.name);

 const dispatch = useDispatch();

 useEffect(() => {
  dispatch(listAllManufacturer());
 }, [listAllManufacturer]);
 const { setShouldCreateModelDialogOpen } = useContext(DialogContext);

 const submitHandler = async (modelsT) => {
  setManufacturerName(data.name);
  await toast.success(constant.POPUP_ADD_MODEL);
  await setShouldCreateModelDialogOpen(false);
  const imglink = await handleUpdate();
  setImageUrl(imglink);
  modelsT.models.map((model) => setNameModel(model.name));

  const dataNew = {
   ...modelsT,
   manufacturerName: data.name,
   models: [{ name: modelsT.models[0].name, imageUrl: imglink }]
  };
  console.log(dataNew, 'debug create model');
  dispatch(createModel(dataNew));
 };

 const handleReset = () => {
  setImageShow('');
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
    setErrorImage(constant.TITLE_ERROR_IMAGE_FORMAT);
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
      console.log(error), reject(constant.TITLE_ERROR_IMAGE + error);
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
    setErrorImage(constant.TITLE_ERROR_IMAGE);
   }
  });
 };

 return (
  <Formik
   initialValues={{
    manufacturerName: manufacturerName,
    models: [{ name, imageUrl }]
   }}
   validateOnChange
   validateOnBlur
   onSubmit={submitHandler}
   onReset={handleReset}
  >
   {({ values, resetForm, ...props }) => {
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
        {constant.TITLE_ADD_MODEL}
       </DialogTitle>

       <DialogContent dividers>
        <Grid>
         <TextField
          fullWidth
          label={constant.LABEL_NAME_MANUFACUTER}
          margin="normal"
          name="manufacturerName"
          variant="outlined"
          value={data.name}
          disable
          onBlur={props.handleBlur}
          // onChange={props.handleChange}
         />

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
                 label={constant.LABEL_NAME_MODEL}
                 margin="normal"
                 name={`models.${index}.name`}
                 variant="outlined"
                 value={models[`${index}`].name}
                 onBlur={props.handleBlur}
                 onChange={props.handleChange}
                />
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
                    src={imageShow}
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
        <Button onClick={onClose} type="reset" color="secondary">
         Hủy
        </Button>
        <Button type="submit" color="primary" left>
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
export default memo(CreateModelDialog);
