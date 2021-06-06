import {
 Box,
 Button,
 Card,
 CardContent,
 TextField,
 InputAdornment,
 SvgIcon
} from '@material-ui/core';
import React, { useReducer } from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { createEmployee, triggerReload } from 'src/actions/userAction';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function rand() {
 return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
 const top = 50 + rand();
 const left = 50 + rand();

 return {
  top: `${top}%`,
  left: `${left}%`,
  transform: `translate(-${top}%, -${left}%)`
 };
}
const useStyles = makeStyles((theme) => ({
 paper: {
  position: 'absolute',
  //   width: 400,
  backgroundColor: theme.palette.background.paper,
  border: '2px solid #000',
  boxShadow: theme.shadows[5],
  padding: theme.spacing(2, 4, 3)
 },
 button: {
  marginRight: '1rem'
 }
}));

export default function CreateEmployee(props) {
 const classes = useStyles();
 // getModalStyle is not a pure function, we roll the style only on the first render
 const [modalStyle] = React.useState(getModalStyle);
 const [open, setOpen] = React.useState(false);

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

 useEffect(() => {
  if (success) {
   alert('Thêm thành công');
   setOpen(false);
   dispatch(triggerReload({}));
   //  window.location.reload();
  }
 }, [success]);

 const handleOpen = () => {
  setOpen(true);
 };
 const handleClose = () => {
  if (window.confirm('Bạn muốn hủy tạo mới nhân viên? ')) {
   setOpen(false);
  }
 };

 const body = (
  <div style={modalStyle} className={classes.paper}>
   <Card>
    <form onSubmit={submitHandler}>
     <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
      {/* <div style={{with:500}}> */}
      <div style={{ marginRight: '1rem' }}>
       <TextField
        fullWidth
        label="Tài Khoản"
        margin="normal"
        name="taiKhoan"
        onChange={(e) => setUsername(e.target.value)}
        variant="outlined"
       />
       <TextField
        fullWidth
        label="Mật khẩu"
        margin="normal"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        variant="outlined"
       />
       <TextField
        fullWidth
        label="Nhập lại mật khẩu"
        margin="normal"
        name="confirmPassword"
        onChange={(e) => setConfirmPassword(e.target.value)}
        type="password"
        variant="outlined"
       />
       <TextField
        fullWidth
        label="Email"
        margin="normal"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        variant="outlined"
       />
       <Button
        className={classes.button}
        color="primary"
        fullWidth
        size="large"
        type="submit"
        variant="contained"
       >
        Thêm nhân viên
       </Button>
      </div>
      <div>
       <TextField
        fullWidth
        label="Số điện thoại"
        margin="normal"
        name="soDt"
        onChange={(e) => setPhone(e.target.value)}
        variant="outlined"
       />
       <TextField
        fullWidth
        label="Họ và Tên"
        margin="normal"
        name="hoTen"
        onChange={(e) => setName(e.target.value)}
        variant="outlined"
       />
       <TextField
        fullWidth
        label="Mã nhóm"
        margin="normal"
        name="maNhom"
        onChange={(e) => setGroup(e.target.value)}
        variant="outlined"
       />
       <TextField
        fullWidth
        label="Mã loại người dùng"
        margin="normal"
        name="maLoaiNguoiDung"
        onChange={(e) => setType(e.target.value)}
        variant="outlined"
       />
       <Button
        color="primary"
        fullWidth
        size="large"
        variant="contained"
        onClick={handleClose}
       >
        Hủy
       </Button>
      </div>
     </Box>
     {/* <Box sx={{ mx: 1, display: 'flex'}}>
      <Button
        className={classes.button}
       color="primary"
       fullWidth
       size="large"
       type="submit"
       variant="contained"
      >
       Thêm nhân viên
      </Button>
      <Button
       color="primary"
       fullWidth
       size="large"
       type="reset"
       variant="contained"
       onClose={handleClose}
      >
       Hủy
      </Button>
     </Box> */}
    </form>
   </Card>
  </div>
 );

 return (
  <Box {...props}>
   <Box
    sx={{
     display: 'flex',
     justifyContent: 'flex-end'
    }}
   >
    <Button>Import</Button>
    <Button sx={{ mx: 1 }}>Export</Button>
    <Button color="primary" variant="contained" onClick={handleOpen}>
     Tạo nhân viên mới
    </Button>
    <Modal
     open={open}
     onClose={handleClose}
     aria-labelledby="simple-modal-title"
     aria-describedby="simple-modal-description"
    >
     {body}
    </Modal>
   </Box>
  </Box>
 );
}
