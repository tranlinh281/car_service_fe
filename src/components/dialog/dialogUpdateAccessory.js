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
import { Form, Formik } from 'formik';
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAccessory } from 'src/actions/accessoryAction';
import { DisplayingErrorMessagesCreateAccessorySchema } from 'src/services/ValidConstants';

const DialogUpdateAccessory = ({ data, open, onClose }) => {
 const dispatch = useDispatch();

 const { manufacturers } = useSelector((state) => state.manufacturerList);
 const { types } = useSelector((state) => state.accessoryTypeList);

 const [initialFormikValues, setInitialFormikValues] = useState({});

 useEffect(() => {
  if (open) {
   setInitialFormikValues(data);
  }
 }, [data, open]);

 const submitHandler = (data) => {
  const parsedData = {
   ...data,
   quantity: parseInt(data.quantity),
   price: parseFloat(data.price)
  };
  
  dispatch(updateAccessory(parsedData));
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
      maxWidth={'sm'}
     >
      <Form>
       <DialogTitle id="customized-dialog-title" onClose={onClose}>
        Phụ Tùng{' '}
        <span>
         <strong>{data.name || ''}</strong>
        </span>
       </DialogTitle>
       <DialogContent dividers>
        <DialogContentText>
         <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
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
            value={parseInt(props.values.quantity)}
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
            value={parseFloat(props.values.price)}
            onBlur={props.handleBlur}
            onChange={props.handleChange}
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
           <FormControl variant="outlined" margin="dense">
            <InputLabel>Loại</InputLabel>
            <Select
             name="type"
             value={props.values.type}
             onChange={props.handleChange}
             defaultValue={data.type}
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
             name="manufacturer"
             value={props.values.manufacturer}
             onChange={props.handleChange}
             defaultValue={data.manufacturer}
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
        <Button autoFocus type="submit" color="primary" left>
         Lưu
        </Button>
        <Button autoFocus onClick={onClose} color="secondary">
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

export default memo(DialogUpdateAccessory);
