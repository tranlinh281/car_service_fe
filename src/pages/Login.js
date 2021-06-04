import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
 Box,
 Button,
 Container,
 TextField,
 Typography
} from '@material-ui/core';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userAction";
import * as valid from '../utils/ValidConstants';

export default function Login(props) {
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const navigate = useNavigate();



 const userLogin = useSelector((state) => state.userLogin);
 const { userInfo, loading, error } = userLogin;

 const dispatch = useDispatch();

 const submitHandler = (e) => {
  e.preventDefault();
  dispatch(login(username, password));
 };
 useEffect(() => {
  if (userInfo) {
    navigate('/app/dashboard', { replace: true });
  }
}, [navigate, userInfo]);
 return (
  <>
   <Helmet>
    <title>Đăng nhập</title>
   </Helmet>
   <Box
    sx={{
     backgroundColor: 'background.default',
     display: 'flex',
     flexDirection: 'column',
     height: '100%',
     justifyContent: 'center'
    }}
   >
    <Container maxWidth="sm">
     <Formik
      initialValues={{
        username: 'demo@devias.io',
       password: 'Password123'
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string()
        .email(valid.VALID_EMAIL)
        .max(255)
        .required(valid.REQUIRED_EMAIL),
        password: Yup.string().max(255).required(valid.REQUIRED_PASSWORD)
      })}

     >
      {({
       errors,
       handleBlur,
       handleChange,
       handleSubmit,
       isSubmitting,
       touched,
       values
      }) => (
       <form onSubmit={submitHandler}>
        <Box sx={{ mb: 3 }}>
         <Typography color="textPrimary" variant="h2" align="center">
          Car Service
         </Typography>
        </Box>
        <TextField
         error={Boolean(touched.username && errors.username)}
         fullWidth
         helperText={touched.username && errors.username}
         label="Địa chỉ email"
         margin="normal"
         name="username"
         onBlur={handleBlur}
         onChange={(e) => setUsername(e.target.value)}
         value={values.setUsername}
         variant="outlined"
        />
        <TextField
         error={Boolean(touched.matKhau && errors.matKhau)}
         fullWidth
         helperText={touched.matKhau && errors.matKhau}
         label="Mật khẩu"
         margin="normal"
         name="password"
         onBlur={handleBlur}
         onChange={(e) => setPassword(e.target.value)}
         type="password"
         value={values.setPassword}
         variant="outlined"
        />
        <Box sx={{ py: 2 }}>
         <Button
          color="primary"
          disabled={isSubmitting}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
         >
          Đăng nhập
         </Button>
        </Box>
       </form>
      )}
     </Formik>
    </Container>
   </Box>
  </>
 );
}
