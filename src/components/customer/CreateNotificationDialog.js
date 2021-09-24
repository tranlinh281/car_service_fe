import {
 DialogActions,
 DialogContent,
 DialogContentText,
 DialogTitle,
 Grid,
 TextField
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createNotification } from 'src/actions/customerAction';
import { CUSTOMER_NOTIFICATION_SUCCESS } from 'src/constants/customerConstant';
import { DisplayingErrorMessagesCreateNotificationSchema } from 'src/services/ValidConstants';
import * as constant from 'src/utils/Constants';

export default function CreateNotificationDialog({ data, open, onClose }) {
 const [title, setTitle] = useState('');
 const [id, setId] = useState(data);
 const [body, setBody] = useState(0);

 const [notificationModel, setNotificationModel] = useState();
 const setForm = ({ id, title, body }) => {
  setTitle(title);
  setId(id);
  setBody(body);
 };

 const dispatch = useDispatch();

 const submitHandler = (notification) => {
  dispatch(createNotification(notification));
  toast.success(constant.POPUP_CONFIRM_NOTIFICATION);
  dispatch({ type: CUSTOMER_NOTIFICATION_SUCCESS, payload: false });
  dispatch(triggerReload({}));
 };

 useEffect(() => {
  setNotificationModel((prev) => ({
   ...prev,
   id,
   title,
   body
  }));
 }, [id, title, body]);
 useEffect(() => {
  if (data && open) {
   setForm(data);
  }
 }, [data, open]);

 const handleReset = () => {};

 return (
  <>
   <Formik
    initialValues={{
     vehicleId: data,
     title: '',
     body: ''
    }}
    validationSchema={DisplayingErrorMessagesCreateNotificationSchema}
    validateOnChange
    validateOnBlur
    enableReinitialize
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
       <DialogTitle id="customized-dialog-title">
        {constant.TITLE_SEND_NOTIFICATION}
       </DialogTitle>
       <DialogContent dividers>
        <DialogContentText>
         <Grid item>
          <TextField
           fullWidth
           label={constant.LABEL_TITLE}
           error={!!errors.title}
           helperText={errors.title}
           value={values.title}
           onBlur={handleBlur}
           onChange={handleChange}
           margin="normal"
           name="title"
           variant="outlined"
           required
          />
          <TextField
           multiline
           fullWidth
           label={constant.LABEL_DESCRIPTION_NOTIFICATION}
           margin="normal"
           error={!!errors.body}
           helperText={errors.body}
           onBlur={handleBlur}
           onChange={handleChange}
           name="body"
           variant="outlined"
           value={values.body}
          />
         </Grid>
        </DialogContentText>
       </DialogContent>
       <DialogActions>
        <Button autoFocus type="reset" onClick={onClose} color="secondary">
         {constant.TITLE_CANCEL}
        </Button>
        <Button autoFocus type="submit" color="primary" onClick={onClose} left>
         {constant.TITLE_SEND_NOTI}
        </Button>
       </DialogActions>
      </Form>
     </Dialog>
    )}
   </Formik>
  </>
 );
}
