import { useState } from 'react';
import {
 Box,
 Button,
 Card,
 CardContent,
 CardHeader,
 Divider,
 Grid,
 TextField
} from '@material-ui/core';
import { useSelector } from 'react-redux';

const states = [
 {
  value: 'alabama',
  label: 'Alabama'
 },
 {
  value: 'new-york',
  label: 'New York'
 },
 {
  value: 'san-francisco',
  label: 'San Francisco'
 }
];

const AccountProfileDetails = (props) => {
 const userLogin = useSelector((state) => state.userLogin);
 console.log(userLogin, 'debug');
 console.log(userLogin.userInfo.profile.Fullname, 'debug');
 const [values, setValues] = useState({
  firstName: 'Katarina',
  lastName: 'Smith',
  email: 'demo@devias.io',
  phone: '',
  state: 'Alabama',
  country: 'USA'
 });

 const handleChange = (event) => {
  setValues({
   ...values,
   [event.target.name]: event.target.value
  });
 };

 return (
  <form autoComplete="off" noValidate {...props}>
   <Card>
    <CardHeader subheader="Chỉnh sửa thông tin" title="Thông tin" />
    <Divider />
    <CardContent>
     <Grid container spacing={3}>
      <Grid item md={6} xs={12}>
       <TextField
        fullWidth
        helperText="Nhập tên của mình"
        label="Họ và tên"
        name="name"
        onChange={handleChange}
        required
        value={userLogin.userInfo.profile.Fullname}
        variant="outlined"
       />
      </Grid>
      <Grid item md={6} xs={12}>
       <TextField
        fullWidth
        label="S"
        name="dateOfBirth"
        onChange={handleChange}
        required
        value={userLogin.userInfo.profile.Fullname}
        variant="outlined"
       />
      </Grid>
      <Grid item md={6} xs={12}>
       <TextField
        fullWidth
        label="Địa chỉ email"
        name="email"
        onChange={handleChange}
        required
        value={userLogin.userInfo.profile.Email}
        variant="outlined"
       />
      </Grid>
      <Grid item md={6} xs={12}>
       <TextField
        fullWidth
        label="Số điện thoại"
        name="phoneNumber"
        onChange={handleChange}
        type="number"
        value={userLogin.userInfo.profile.PhoneNumber}
        variant="outlined"
       />
       <TextField
        fullWidth
        label="Địa chỉ"
        name="address"
        onChange={handleChange}
        value={userLogin.userInfo.profile.Address}
        variant="outlined"
       />
      </Grid>
     </Grid>
    </CardContent>
    <Divider />
    <Box
     sx={{
      display: 'flex',
      justifyContent: 'flex-end',
      p: 2
     }}
    >
     <Button color="primary" variant="contained">
      Save details
     </Button>
    </Box>
   </Card>
  </form>
 );
};

export default AccountProfileDetails;
