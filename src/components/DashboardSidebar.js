import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
 Avatar,
 Box,
 Divider,
 Drawer,
 Hidden,
 List,
 Typography
} from '@material-ui/core';
import {
 // AlertCircle as AlertCircleIcon,
 BarChart as BarChartIcon,
 BarChart2,
 // Settings as SettingsIcon,
 ShoppingBag as ShoppingBagIcon,
 User as UserIcon,
 // UserPlus as UserPlusIcon,
 Users as UsersIcon
} from 'react-feather';
import NavItem from './NavItem';
import * as constants from '../utils/Constants';

const userInfo = [];
userInfo.push();
console.log(localStorage.getItem('userInfo'));
const user = {
 avatar: '/static/images/avatars/avatar_6.png',
 jobTitle: userInfo.role
 // name: userInfo.profile.Fullname
};

const items = [
 {
  href: '/app/dashboard',
  icon: BarChartIcon,
  title: constants.DASHBOARD_TITLE
 },
 {
  href: '/app/employee',
  icon: UserIcon,
  title: constants.EMPLOYEE_TITLE
 },
 {
  href: '/app/customers',
  icon: UsersIcon,
  title: constants.CUS_TITLE
 },
 {
  href: '/app/accessories',
  icon: ShoppingBagIcon,
  title: constants.ACCESSORIES_TITLE
 },
 {
  href: '/app/manufacturer',
  icon: ShoppingBagIcon,
  title: constants.MANUFACTURER_TITLE
 },

 // {
 //   href: '/app/settings',
 //   icon: SettingsIcon,
 //   title: constants.SETTING_TITLE
 // },
 {
  href: '/app/report',
  icon: BarChart2,
  title: constants.REPORT_TITLE
 }
 // {
 //   href: '/register',
 //   icon: UserPlusIcon,
 //   title: 'Register'
 // },
 // {
 //   href: '/404',
 //   icon: AlertCircleIcon,
 //   title: 'Error'
 // }
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
 const location = useLocation();

 useEffect(() => {
  if (openMobile && onMobileClose) {
   onMobileClose();
  }
  localStorage.removeItem('keySearch');
 }, [location.pathname]);

 const content = (
  <Box
   sx={{
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
   }}
  >
   <Box
    sx={{
     alignItems: 'center',
     display: 'flex',
     flexDirection: 'column',
     p: 2
    }}
   >
    <Avatar
     component={RouterLink}
     src={user.avatar}
     sx={{
      cursor: 'pointer',
      width: 64,
      height: 64
     }}
     to="/app/account"
    />
    <Typography color="textPrimary" variant="h5">
     {user.name}
    </Typography>
    <Typography color="textSecondary" variant="body2">
     {user.jobTitle}
    </Typography>
   </Box>
   <Divider />
   <Box sx={{ p: 2 }}>
    <List>
     {items.map((item) => (
      <NavItem
       href={item.href}
       key={item.title}
       title={item.title}
       icon={item.icon}
      />
     ))}
    </List>
   </Box>
   <Box sx={{ flexGrow: 1 }} />
  </Box>
 );

 return (
  <>
   <Hidden lgUp>
    <Drawer
     anchor="left"
     onClose={onMobileClose}
     open={openMobile}
     variant="temporary"
     PaperProps={{
      sx: {
       width: 256
      }
     }}
    >
     {content}
    </Drawer>
   </Hidden>
   <Hidden lgDown>
    <Drawer
     anchor="left"
     open
     variant="persistent"
     PaperProps={{
      sx: {
       width: 256,
       top: 64,
       height: 'calc(100% - 64px)'
      }
     }}
    >
     {content}
    </Drawer>
   </Hidden>
  </>
 );
};

DashboardSidebar.propTypes = {
 onMobileClose: PropTypes.func,
 openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
 onMobileClose: () => {},
 openMobile: false
};

export default DashboardSidebar;
