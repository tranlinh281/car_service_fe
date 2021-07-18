import {
    Box,
    Button,
    Container,
    TextField,
    Typography
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { USER_LOGIN_FAIL } from 'src/constants/userConstant';
import { DisplayingErrorMessagesLoginSchema } from 'src/services/ValidConstants';
import { login, triggerReload } from '../actions/userAction';

export default function Login(props) {
    const navigate = useNavigate();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo, loading, error } = userLogin;

    const dispatch = useDispatch();

    const submitHandler = ({ username, password }) => {
        dispatch(login(username, password));
    };

    useEffect(() => {
        if (userInfo) {
            if (userInfo.role === 'admin') {
                navigate('/app/dashboard', { replace: true });
            } else {
                toast.error('Tài khoản không có quyền truy cập');
                localStorage.removeItem('userInfo');
            }
        }
        if (error) {
            toast.error('Sai tài khoản hoặc mật khẩu, vui lòng thử lại');
            dispatch({ type: USER_LOGIN_FAIL, payload: false });
        }
    }, [navigate, userInfo, error, triggerReload]);

    return (
        <>
            <Helmet>
                <title>Đăng nhập</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    display: 'flex',
                    flexDirection: 'row',
                    height: '100%',
                    justifyContent: 'center',
                    paddingTop: '20px'
                }}
            >
                <Container maxWidth="sm" sx={{ mb: 3 }}>

                    {/* <Box sx={{ mb: 3 }}> */}
                    <img
                        src={'/static/images/background_login_page.svg'}
                    // style={{
                    //     height: '85vh',
                    //     width: '100%'
                    // }}
                    />
                    {/* </Box> */}
                </Container >
                <Container maxWidth="sm" sx={{my: 12}}>
                    <Formik
                        initialValues={{
                            username: '',
                            password: ''
                        }}
                        validationSchema={DisplayingErrorMessagesLoginSchema}
                        onSubmit={submitHandler}
                        validateOnChange
                        validateOnBlur
                    >
                        {({
                            errors,
                            handleBlur,
                            isSubmitting,
                            touched,
                            values,
                            handleChange
                        }) => (
                            <Form >
                                <Box >
                                    <Typography color="textPrimary" variant="h2" align="center">
                                        Car Service
                                    </Typography>
                                </Box>
                                <TextField
                                    sx={{ pr: 18, ml: 10 }}
                                    name="username"
                                    error={!!errors.username}
                                    helperText={errors.username}
                                    fullWidth
                                    label="Tài khoản"
                                    margin="normal"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.username}
                                    variant="outlined"
                                />
                                <TextField
                                    sx={{ pr: 18, ml: 10 }}
                                    name="password"
                                    error={!!errors.password}
                                    helperText={errors.password}
                                    fullWidth
                                    label="Mật khẩu"
                                    margin="normal"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.password}
                                    type="password"
                                    variant="outlined"
                                />
                                <Box sx={{ py: 2, pr: 15, pl: 17}}>
                                    <Button
                                        color="primary"
                                        disabled={error && isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                    >
                                        Đăng nhập
                                    </Button>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </Container>
            </Box>
        </>
    );
}
