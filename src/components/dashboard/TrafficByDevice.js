import { Doughnut } from 'react-chartjs-2';
import {
 Box,
 Card,
 CardContent,
 CardHeader,
 Divider,
 Typography,
 colors,
 useTheme
} from '@material-ui/core';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import PhoneIcon from '@material-ui/icons/Phone';
import TabletIcon from '@material-ui/icons/Tablet';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { listAllOrder } from 'src/actions/orderAction';

const TrafficByDevice = (props) => {
 const { orders } = useSelector((state) => state.ordersList);
 const dispatch = useDispatch();

 useEffect(() => {
  dispatch(listAllOrder());
 }, [dispatch]);
 const theme = useTheme();

 const data = {
  datasets: [
   {
    data: [orders.done, orders.cancelDay, orders.processingAll],
    backgroundColor: [colors.indigo[500], colors.red[600], colors.orange[600]],
    borderWidth: 8,
    borderColor: colors.common.white,
    hoverBorderColor: colors.common.white
   }
  ],
  labels: ['Đơn đã hoàn thành', 'Đơn đã hủy', 'Đơn đang tiến hành']
 };

 const options = {
  animation: false,
  cutoutPercentage: 80,
  layout: { padding: 0 },
  legend: {
   display: false
  },
  maintainAspectRatio: false,
  responsive: true,
  tooltips: {
   backgroundColor: theme.palette.background.paper,
   bodyFontColor: theme.palette.text.secondary,
   borderColor: theme.palette.divider,
   borderWidth: 1,
   enabled: true,
   footerFontColor: theme.palette.text.secondary,
   intersect: false,
   mode: 'index',
   titleFontColor: theme.palette.text.primary
  }
 };

 const devices = [
  {
   title: 'Đơn đã hoàn thành',
   value: orders.done,
   icon: LaptopMacIcon,
   color: colors.indigo[500]
  },
  {
   title: 'Đơn đã hủy',
   value: orders.cancelDay,
   icon: TabletIcon,
   color: colors.red[600]
  },
  {
   title: 'Đơn đang tiến hành',
   value: orders.processingAll,
   icon: PhoneIcon,
   color: colors.orange[600]
  }
 ];

 return (
  <Card {...props}>
   <CardHeader title="Tổng quan đơn trong ngày" />
   <Divider />
   <CardContent>
    <Box
     sx={{
      height: 300,
      position: 'relative'
     }}
    >
     <Doughnut data={data} options={options} />
    </Box>
    <Box
     sx={{
      display: 'flex',
      justifyContent: 'center',
      pt: 2
     }}
    >
     {devices.map(({ color, icon: Icon, title, value }) => (
      <Box
       key={title}
       sx={{
        p: 1,
        textAlign: 'center'
       }}
      >
       <Icon color="action" />
       <Typography color="textPrimary" variant="body1">
        {title}
       </Typography>
       <Typography style={{ color }} variant="h2">
        {value}%
       </Typography>
      </Box>
     ))}
    </Box>
   </CardContent>
  </Card>
 );
};

export default TrafficByDevice;
