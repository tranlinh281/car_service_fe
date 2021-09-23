import {
 Button,
 Dialog,
 DialogActions,
 DialogContent,
 DialogTitle,
 FormControl,
 Grid,
 InputLabel,
 MenuItem,
 Select,
 TextField
} from '@material-ui/core';
import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateEmployee } from 'src/actions/userAction';
import * as constant from 'src/utils/Constants';

const DialogUpdateEmployee = ({ data, open, onClose }) => {
 const dispatch = useDispatch();
 const [role, setRole] = useState('');
 const [username, setUsername] = useState('');
 const [employeeModels, setEmployeeModels] = useState();

 const setForm = ({ username, role }) => {
  setUsername(username);
  setRole(role);
 };

 useEffect(() => {
  setEmployeeModels((prev) => ({
   ...prev,
   username,
   role
  }));
 }, [username, role]);

 useEffect(() => {
  if (data && open) {
   setForm(data);
   setEmployeeModels(data);
  }
 }, [data, open]);

 const submitHandler = (e) => {
  e.preventDefault();
  dispatch(updateEmployee(employeeModels));
 };

 return (
  <Dialog
   onClose={onClose}
   aria-describedby="scroll-dialog-description"
   open={open}
   maxWidth={'xs'}
   fullWidth={true}
  >
   <DialogTitle id="customized-dialog-title" onClose={onClose}>
    {constant.TITLE_HEADER_EMPLOYEE}:
    <span>
     <strong>{data.fullname}</strong>
    </span>
   </DialogTitle>
   <DialogContent dividers>
    <Grid item>
     <TextField
      fullWidth
      label={constant.LABEL_NAME_EMPLOYEE}
      margin="normal"
      defaultValue={data.fullname}
      name="name"
      variant="outlined"
      InputProps={{
       readOnly: true
      }}
     />

     <TextField
      fullWidth
      label={constant.TITLE_EMAIL}
      margin="normal"
      defaultValue={data.email}
      name="email"
      variant="outlined"
      InputProps={{
       readOnly: true
      }}
      InputLabelProps={{
       shrink: true
      }}
     />
     <TextField
      fullWidth
      label={constant.TITLE_ADDRESS}
      margin="normal"
      defaultValue={data.address}
      InputProps={{
       readOnly: true
      }}
      name="address"
      variant="outlined"
      InputLabelProps={{
       shrink: true
      }}
     />

     <TextField
      fullWidth
      label={constant.TITLE_PHONE}
      margin="normal"
      defaultValue={data.phoneNumber}
      InputProps={{
       readOnly: true
      }}
      name="phoneNumber"
      variant="outlined"
      InputLabelProps={{
       shrink: true
      }}
     />
     <Grid container spacing={2}>
      <Grid item xs={6} sm={6}>
       <TextField
        id="date"
        label={constant.TITLE_DATE_OF_BIRTH}
        type="date"
        value={data.dateOfBirth?.split('T')[0] || ''}
        InputProps={{
         readOnly: true
        }}
        name="dateOfBirth"
        margin="normal"
        variant="outlined"
        InputLabelProps={{
         shrink: true
        }}
       />
      </Grid>
      <Grid item xs={6} sm={6}>
       <FormControl variant="outlined" margin="normal" fullWidth>
        <InputLabel>{constant.LABEL_ROLE}</InputLabel>
        <Select
         defaultValue={data.role}
         onChange={(e) => setRole(e.target.value)}
         label={constant.LABEL_ROLE}
        >
         <MenuItem value={constant.VALUE_MANAGER_ENG}>
          {constant.VALUE_MANAGER_VIE}
         </MenuItem>
         <MenuItem value={constant.VALUE_STAFF_ENG}>
          {constant.VALUE_STAFF_VIE}
         </MenuItem>
        </Select>
       </FormControl>
      </Grid>
     </Grid>
    </Grid>
   </DialogContent>
   <DialogActions color="red">
    <Button autoFocus onClick={onClose} color="secondary">
     {constant.TITLE_CANCEL}
    </Button>
    <Button autoFocus onClick={submitHandler} color="primary" left>
     {constant.TITLE_SAVE}
    </Button>
   </DialogActions>
  </Dialog>
 );
};

export default memo(DialogUpdateEmployee);
