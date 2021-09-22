import { Box, Divider, Drawer, Hidden, List } from '@material-ui/core';
import { Build, CalendarToday, HistoryEdu, LocalAtm } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import {
 // AlertCircle as AlertCircleIcon,
 BarChart as BarChartIcon,
 Package as PackageIcon,
 // Settings as SettingsIcon,
 ShoppingBag as ShoppingBagIcon,
 StopCircle,
 User as UserIcon,
 // UserPlus as UserPlusIcon,
 Users as UsersIcon
} from 'react-feather';
import { useLocation } from 'react-router-dom';
import * as constants from '../utils/Constants';
import NavItem from './NavItem';

const userInfo = [];
userInfo.push();
console.log(localStorage.getItem('userInfo'));
// const user = {
//  avatar: '/static/css_banner.png',
//  jobTitle: userInfo.role
//  // name: userInfo.profile.Fullname
// };

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
  href: '/app/calender',
  icon: CalendarToday,
  title: constants.CALENDER_TITLE
 },
 {
  href: '/app/customers',
  icon: UsersIcon,
  title: constants.CUS_TITLE
 },
 {
  href: '/app/accessories',
  icon: Build,
  title: constants.ACCESSORIES_TITLE
 },
 {
  href: '/app/service',
  icon: ShoppingBagIcon,
  title: constants.SERVICE_TITLE
 },
 {
  href: '/app/packages',
  icon: PackageIcon,
  title: constants.PACKAGE_SERVICE_TITLE
 },
 {
  href: '/app/manufacturer',
  icon: StopCircle,
  title: constants.MANUFACTURER_TITLE
 },
 {
  href: '/app/orders',
  icon: LocalAtm,
  title: constants.ORDER_PAYMENT_TITLE
 },
 {
  href: '/app/history',
  icon: HistoryEdu,
  title: constants.ORDER_HISTORY_TITLE
 }
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
   {/* <Box
    sx={{
     alignItems: 'center',
     display: 'flex',
     flexDirection: 'column',
     p: 2
    }}
   >
    <img
     component={RouterLink}
     src={user.avatar}
     style={{ width: '10vw' }}
     to="/"
    />
    <Typography color="textPrimary" variant="h5">
     {user.name}
    </Typography>
    <Typography color="textSecondary" variant="body2">
     {user.jobTitle}
    </Typography>
   </Box> */}
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
