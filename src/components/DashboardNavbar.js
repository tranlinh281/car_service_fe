import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
 AppBar,
 Box,
 Hidden,
 IconButton,
 Toolbar
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import Logo from './Logo';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userAction';
import ConfirmDialog from 'src/components/dialog/dialogConfirm';

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
 const [confirmDialog, setConfirmDialog] = useState({
  isOpen: false,
  title: '',
  subTitle: ''
 });
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const signoutHandler = () => {
  dispatch(logout());
  navigate('/login', { replace: true });
 };
 return (
  <AppBar elevation={0} {...rest}>
   <Toolbar>
   {/* <Box sx={{ flexGrow: 0.03 }} /> */}
    <RouterLink to="/">
     <Logo />
    </RouterLink>
    <Box sx={{ flexGrow: 1 }} />
    <Hidden lgDown>
     <IconButton
      color="inherit"
      onClick={() => {
       setConfirmDialog({
        isOpen: true,
        title: 'Bạn có chắc muốn Đăng Xuất?',
        onConfirm: () => {
         signoutHandler(), setConfirmDialog({ isOpen: false });
        }
       });
      }}
     >
      <InputIcon />
     </IconButton>
    </Hidden>
    <Hidden lgUp>
     <IconButton color="inherit" onClick={onMobileNavOpen}>
      <MenuIcon />
     </IconButton>
    </Hidden>
   </Toolbar>
   <ConfirmDialog
    confirmDialog={confirmDialog}
    setConfirmDialog={setConfirmDialog}
   />
  </AppBar>
 );
};

DashboardNavbar.propTypes = {
 onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
