import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import {
    Box,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormLabel,
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEmployee, triggerReload } from 'src/actions/userAction';

export default function CreateEmployeeDialog() {



    const [open, setOpen] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [fullname, setFullname] = useState('');
    const [phoneNumber, setPhonenumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');

    const employeeModels = {
        username: username,
        password: password,
        role: role,
        fullname: fullname,
        phoneNumber: phoneNumber,
        dateOfBirth: dateOfBirth
    }

    const createEmp = useSelector((state) => state.createEmp);
    const { success, loading, error } = createEmp;

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(employeeModels)
        dispatch(
            createEmployee(
                employeeModels
            )
        );

    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setGender(event.target.value);
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
        <>
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
            <Dialog onClose={handleClose} aria-describedby="scroll-dialog-description" open={open} fullWidth={true} maxWidth={'md'}>
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
                                    name="username"
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
                                    label="Họ tên"
                                    margin="normal"
                                    name="fullname"
                                    variant="outlined"
                                    onChange={(e) => setFullname(e.target.value)}
                                />

                                {/* <TextField
                                    fullWidth
                                    label="Địa chỉ"
                                    margin="normal"
                                    name="address"
                                    variant="outlined"
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                                <TextField
                                    fullWidth
                                    label="Email"
                                    margin="normal"
                                    name="email"
                                    variant="outlined"
                                    onChange={(e) => setEmail(e.target.value)}
                                /> */}
                            </Grid>
                            <Grid item xs={6}>

                                <TextField
                                    fullWidth
                                    label="Số điện thoại"
                                    margin="normal"
                                    name="phoneNumber"
                                    variant="outlined"
                                    onChange={(e) => setPhonenumber(e.target.value)}
                                />
                                {/* <FormControl component="fieldset">
                                    <FormLabel component="legend">Giới tính</FormLabel>
                                    <RadioGroup aria-label="gender" name="gender1" value={gender} onChange={handleChange} row>
                                        <FormControlLabel value="male" control={<Radio />} label="Nam" labelPlacement="end" />
                                        <FormControlLabel value="female" control={<Radio />} label="Nữ" labelPlacement="end" />
                                    </RadioGroup>
                                </FormControl> */}
                                <FormControl variant="outlined" margin='dense'>
                                    <TextField
                                        id="date"
                                        label="Ngày sinh"
                                        type="date"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={(e) => setDateOfBirth(e.target.value)}
                                    />
                                </FormControl>

                                {/* <FormControl variant="outlined" margin='dense'> */}
                                <InputLabel >Vị trí</InputLabel>
                                <Select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    label="Vị trí"
                                >
                                    <MenuItem value='manager'>Quản lý</MenuItem>
                                    <MenuItem value='staff'>Kỹ thuật viên</MenuItem>
                                </Select>
                                {/* </FormControl> */}
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
        </>
    );
}
