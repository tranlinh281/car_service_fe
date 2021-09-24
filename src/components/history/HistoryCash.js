import {
 Box,
 Button,
 Dialog,
 DialogActions,
 Grid,
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableRow,
 Typography
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { receiptHeader } from 'src/services/HeaderTitleTable';
import * as constant from '../../utils/Constants';
import LoadingBox from '../LoadingBox';

const numberFormat = (value) =>
 new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(
  value
 );
const HistoryCash = ({ open, onClose }) => {
 const { order } = useSelector((state) => state.orderStatusIdList);

 let paymentDetail = null;
 console.log(order, 'debug data payment');
 if (order?.customer) {
  const totalPricePackage = order.packages.reduce(
   (total, item) => (item.price ? total + item.price : total),
   0
  );
  const totalPriceOrder = order.orderDetails.reduce(
   (total, item) => (item.price ? total + item.price : total),
   0
  );
  const totalPrice = totalPricePackage + totalPriceOrder;
  paymentDetail = {
   id: order.id,
   fullname: order.customer.fullname,
   phoneNumber: order.customer.phoneNumber,
   email: order.customer.email,
   address: order.customer.address,
   checkinTime: order.completeTime?.split('T')[0] || '',
   manufacturer: order.vehicle.manufacturer,
   licensePlate: order.vehicle.licensePlate,
   totalPrice,
   orderDetail: order.orderDetails?.map((item) => ({
    packageName: constant.TITLE_ANOTHER,
    name: item.name,
    price: item.price
   })),
   packages: order.packages?.map((item) => ({
    name: item.name,
    price: item.price,
    orderDetails: item.orderDetails?.map((service) => service.name)
   }))
  };
 }

 return (
  <Dialog
   onClose={onClose}
   aria-describedby="scroll-dialog-description"
   open={open}
   maxWidth={'md'}
  >
   {order ? (
    <Box minWidth="768px">
     <DialogActions>
      <Button type="reset" onClick={onClose} color="secondary">
       <Close fontSize="small" color="secondary" />
      </Button>
     </DialogActions>

     <Grid container px={2} py={4}>
      <Typography variant="h2" color="primary">
       {constant.TITLE_RECEIPT}
       {constant.TITLE_DONE}
      </Typography>
     </Grid>
     <Grid container justifyContent="flex-end" px={2}>
      <Typography variant="body1">
       <b>{constant.TITLE_DATE}:</b> {paymentDetail?.checkinTime}
      </Typography>
     </Grid>
     <Grid container px={2}>
      <Typography variant="body1">
       <b>{constant.CUS_TITLE}: </b> {paymentDetail?.fullname}
      </Typography>
     </Grid>
     <Grid container px={2}>
      <Typography variant="body1">
       <b>{constant.ADDRESS_TITLE}: </b>
       {paymentDetail?.address}
      </Typography>
     </Grid>
     <Grid container px={2}>
      <Typography variant="body1">
       <b>{constant.TITLE_PHONE}: </b> {paymentDetail?.phoneNumber}
      </Typography>
     </Grid>
     <Grid container px={2}>
      <Typography variant="body1">
       <b>{constant.TITLE_EMAIL}: </b> {paymentDetail?.email}
      </Typography>
     </Grid>
     <Grid container px={2}>
      <Typography variant="body1">
       <b>{constant.MANUFACTURER_TITLE}: </b> {paymentDetail?.manufacturer}
      </Typography>
     </Grid>
     <Grid container px={2}>
      <Typography variant="body1">
       <b>{constant.TITLE_PLATE}:</b> {paymentDetail?.licensePlate}
      </Typography>
     </Grid>
     <Grid container py={2}>
      <Table>
       <TableHead>
        <TableRow>
         {receiptHeader.map((headCell) => (
          <TableCell key={headCell.id}>{headCell.title}</TableCell>
         ))}
        </TableRow>
       </TableHead>
       <TableBody>
        {paymentDetail?.packages?.map((item) => (
         <TableRow>
          <TableCell>{item.name}</TableCell>
          <TableCell>{item.orderDetails.join(', ')}</TableCell>;
          {item.price === 0 ? (
           <TableCell>N/A</TableCell>
          ) : (
           <TableCell>{numberFormat(item.price)}</TableCell>
          )}
         </TableRow>
        ))}
        {paymentDetail?.orderDetail?.map((item) => (
         <TableRow>
          <TableCell>
           <b>{item.packageName}</b>
          </TableCell>
          <TableCell>{item.name}</TableCell>
          <TableCell></TableCell>{' '}
          {item.price === 0 ? (
           <TableCell>N/A</TableCell>
          ) : (
           <TableCell>{numberFormat(item.price)}</TableCell>
          )}
         </TableRow>
        ))}
       </TableBody>
       <TableBody>
        <TableRow></TableRow>
        <TableRow>
         <TableCell></TableCell>
         <TableCell></TableCell>
         <TableCell>{constant.TITLE_TOTAL_PRICE}</TableCell>
         <TableCell>{numberFormat(paymentDetail?.totalPrice)}</TableCell>
        </TableRow>
       </TableBody>
      </Table>
     </Grid>
    </Box>
   ) : (
    <Box
     minWidth="768px"
     minHeight="400px"
     display="flex"
     justifyContent="center"
     alignItems="center"
    >
     <LoadingBox />
    </Box>
   )}
  </Dialog>
 );
};

export default memo(HistoryCash);
