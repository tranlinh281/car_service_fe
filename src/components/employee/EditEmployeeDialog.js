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
 Paper,
 TextField
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateEmployee, triggerReload } from 'src/actions/userAction';
import { Form } from 'formik';

export default function EditEmployeeDialog(props) {
 const { dataFromParent, phoneNumber } = props;

 const [open, setOpen] = useState(false);
 const [openConfirm, setOpenConfirm] = useState(false);

 const [taiKhoan, setUsername] = useState(dataFromParent.taiKhoan);
 const [matKhau, setPassword] = useState(dataFromParent.password);
 const [email, setEmail] = useState(dataFromParent.email);
 const [soDt, setPhone] = useState(dataFromParent.soDt);
 const [maNhom, setGroup] = useState(dataFromParent.maNhom);
 const [maLoaiNguoiDung, setType] = useState(dataFromParent.maLoaiNguoiDung);
 const [hoTen, setName] = useState(dataFromParent.hoTen);

 const editEmployee = useSelector((state) => state.editEmployee);
 const { success, loading, error } = editEmployee;

 const dispatch = useDispatch();
 const submitHandler = (e) => {
  e.preventDefault();
console.log(taiKhoan,"testing");
  dispatch(
   updateEmployee(
    taiKhoan,
    matKhau,
    email,
    soDt,
    maNhom,
    maLoaiNguoiDung,
    hoTen
   )
  );
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
   alert('Sửa thành công thành công');
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
     Sửa nhân viên
    </Button>
   </Box>
   <Dialog
    onClose={handleClose}
    aria-describedby="scroll-dialog-description"
    open={open}
    fullWidth={true}
    maxWidth={'md'}
   >
    <DialogTitle id="customized-dialog-title">Sửa nhân viên</DialogTitle>
    <DialogContent dividers>
     <DialogContentText>
      <Grid container spacing={3}>
       <Grid item xs={12} sm={6}>
        <TextField
         fullWidth
         label="Tài Khoản"
         margin="normal"
         name="taiKhoan"
         variant="outlined"
         value={dataFromParent.taiKhoan}
         disabled={true}
         onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
         fullWidth
         label="Email"
         margin="normal"
         name="email"
         value={email}
         variant="outlined"
         onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
         fullWidth
         label="Số điện thoại"
         margin="normal"
         name="soDt"
         value={soDt}
         variant="outlined"
         onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
         fullWidth
         label="Mật Khẩu"
         margin="normal"
         type="password"
         name="matKhau"
         value={dataFromParent.matKhau}
         disabled={true}
         variant="outlined"
         onChange={(e) => setPhone(e.target.value)}
        />
       </Grid>
       <Grid item xs={6}>
        <TextField
         fullWidth
         label="Họ và Tên"
         margin="normal"
         name="hoTen"
         value={hoTen}
         variant="outlined"
         onChange={(e) => setName(e.target.value)}
        />
        {/* <TextField
         fullWidth
         label="Mã nhóm"
         margin="normal"
         name="maNhom"
         value={dataFromParent.maNhom}
         variant="outlined"
         onChange={(e) => setGroup(e.target.value)}
        /> */}
        <TextField
         fullWidth
         label="Mã loại người dùng"
         margin="normal"
         name="maLoaiNguoiDung"
         disabled={true}
         value={dataFromParent.maLoaiNguoiDung}
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
