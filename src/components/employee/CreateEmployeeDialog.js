import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { Box, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEmployee, triggerReload } from 'src/actions/userAction';
import { Form } from 'formik';

export default function CreateEmployeeDialog() {
    const [open, setOpen] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);

    const [taiKhoan, setUsername] = useState('');
    const [matKhau, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [soDt, setPhone] = useState('');
    const [maNhom, setGroup] = useState('');
    const [maLoaiNguoiDung, setType] = useState('');
    const [hoTen, setName] = useState('');

    const createEmp = useSelector((state) => state.createEmp);
    const { success, loading, error } = createEmp;

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        if (matKhau !== confirmPassword) {
            alert('Password and confirm password are not match');
        } else {
            dispatch(
                createEmployee(
                    taiKhoan,
                    matKhau,
                    email,
                    soDt,
                    maNhom,
                    maLoaiNguoiDung,
                    hoTen
                )
            );
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (success) {
            console.log(success);
            alert('Thêm thành công');
            setOpen(false);
            dispatch(triggerReload({}));
            //  window.location.reload();
        }
    }, [success]);

    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}
            >
                <Button variant="contained" color="primary" onClick={handleClickOpen}>
                    Thêm nhân viên
      </Button>
            </Box>
            <Dialog onBackdropClick="false" onClose={handleClose} aria-describedby="scroll-dialog-description" open={open} fullWidth={true} maxWidth={'md'}>
                <DialogTitle id="customized-dialog-title">
                    Thêm nhân viên
        </DialogTitle>
                <DialogContent dividers >
                    <DialogContentText >
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Tài Khoản"
                                        margin="normal"
                                        name="taiKhoan"
                                        variant="outlined"
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Mật khẩu"
                                        margin="normal"
                                        name="password"
                                        type="password"
                                        variant="outlined"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Nhập lại mật khẩu"
                                        margin="normal"
                                        name="confirmPassword"
                                        type="password"
                                        variant="outlined"
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        margin="normal"
                                        name="email"
                                        variant="outlined"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Số điện thoại"
                                        margin="normal"
                                        name="soDt"
                                        variant="outlined"
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Họ và Tên"
                                        margin="normal"
                                        name="hoTen"
                                        variant="outlined"
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Mã nhóm"
                                        margin="normal"
                                        name="maNhom"
                                        variant="outlined"
                                        onChange={(e) => setGroup(e.target.value)}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Mã loại người dùng"
                                        margin="normal"
                                        name="maLoaiNguoiDung"
                                        variant="outlined"
                                        onChange={(e) => setType(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        {/* </Form> */}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={submitHandler} color="primary">
                        Lưu
          </Button>
                    <Button autoFocus onClick={handleClose} color="secondary">
                        Hủy
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
