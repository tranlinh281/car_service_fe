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
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateAbsenceEmployee } from 'src/actions/userAction';
import { EDIT_EMPLOYEE_ABSENT_SUCCESS } from 'src/constants/userConstant';

import { DisplayingErrorMessagesNoteAdminSchema } from 'src/services/ValidConstants';

export default function UpdateAbsentDialog({ data, open, onClose }) {
 const [id, setId] = useState(data);
 const [approved, setApproved] = useState(false);
 const [noteAdmin, setNoteAdmin] = useState(0);
 var dateStart = moment(data.start).format('DD/MM/YYYY');

 const [notificationModel, setNotificationModel] = useState();
 const setForm = ({ id, approved, noteAdmin }) => {
  setId(id);
  setApproved(approved);
  setNoteAdmin(noteAdmin);
 };

 const dispatch = useDispatch();

 const submitHandler = (dennyAbsent) => {
  dispatch(updateAbsenceEmployee(dennyAbsent));
  toast.success('Gửi từ chối ngày nghỉ thành công!');
  dispatch({ type: EDIT_EMPLOYEE_ABSENT_SUCCESS, payload: false });
  dispatch(triggerReload({}));
 };

 useEffect(() => {
  setNotificationModel((prev) => ({
   ...prev,
   id,
   approved,
   noteAdmin
  }));
 }, [id, approved, noteAdmin]);
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
     id: data.id,
     isApproved: false,
     noteAdmin: ''
    }}
    validationSchema={DisplayingErrorMessagesNoteAdminSchema}
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
       <DialogTitle id="customized-dialog-title">Gửi thông báo</DialogTitle>
       <DialogContent dividers>
        <DialogContentText>
         <Grid item>
          <TextField
           fullWidth
           label="Tên Nhân viên"
           margin="normal"
           name="title"
           variant="outlined"
           InputProps={{
            readOnly: true
           }}
           defaultValue={data.title}
          />
          <TextField
           fullWidth
           label="Nội dung xin nghỉ"
           margin="normal"
           defaultValue={data.noteEmp}
           variant="outlined"
           InputProps={{
            readOnly: true
           }}
          />
          <TextField
           fullWidth
           label="Ngày nghỉ"
           margin="normal"
           defaultValue={dateStart}
           variant="outlined"
           InputProps={{
            readOnly: true
           }}
          />
          <TextField
           multiline
           fullWidth
           label="Nội dung từ chối"
           margin="normal"
           error={!!errors.noteAdmin}
           helperText={errors.noteAdmin}
           onBlur={handleBlur}
           onChange={handleChange}
           name="noteAdmin"
           variant="outlined"
           value={values.noteAdmin}
          />
         </Grid>
        </DialogContentText>
       </DialogContent>
       <DialogActions>
        <Button autoFocus type="reset" onClick={onClose} color="secondary">
         Hủy
        </Button>
        <Button autoFocus type="submit" color="primary" onClick={onClose} left>
         Gửi
        </Button>
       </DialogActions>
      </Form>
     </Dialog>
    )}
   </Formik>
  </>
 );
}
