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
import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { paymentCashByAdmin } from 'src/actions/orderAction';
import LoadingBox from '../LoadingBox';
import * as constant from '../../utils/Constants';
import { receiptHeader } from 'src/services/HeaderTitleTable';

const numberFormat = (value) =>
 new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(
  value
 );
const PaymentCash = ({ open, onClose }) => {
 const dispatch = useDispatch();
 const { order } = useSelector((state) => state.orderStatusIdList);
 const { loading: paymentLoading } = useSelector((state) => state.paymentCash);

 let paymentDetail = null;

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
  console.log(order, 'debug payment');
  paymentDetail = {
   id: order.id,
   fullname: order.customer.fullname,
   phoneNumber: order.customer.phoneNumber,
   email: order.customer.email,
   address: order.customer.address,
   checkinTime: order.createdTime?.split('T')[0] || '',
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

 const paymentByCash = (id) => {
  const dataNew = {
   id,
   status: constant.STATUS_DONE
  };
  dispatch(paymentCashByAdmin(dataNew));
 };

 return (
  <Dialog
   onClose={onClose}
   aria-describedby="scroll-dialog-description"
   open={open}
   maxWidth={'md'}
  >
   {order ? (
    <Box minWidth="768px">
     <Grid container px={2} py={4}>
      <Typography variant="h2" color="primary">
       Hóa Đơn
      </Typography>
     </Grid>
     <Grid container justifyContent="flex-end" px={2}>
      <Typography variant="body1">
       <b>Ngày:</b> {paymentDetail?.checkinTime}
      </Typography>
     </Grid>
     <Grid container px={2}>
      <Typography variant="body1">
       <b>Khách hàng: </b> {paymentDetail?.fullname}
      </Typography>
     </Grid>
     <Grid container px={2}>
      <Typography variant="body1">
       <b>Địa chỉ: </b>
       {paymentDetail?.address}
      </Typography>
     </Grid>
     <Grid container px={2}>
      <Typography variant="body1">
       <b>Số điện thoại: </b> {paymentDetail?.phoneNumber}
      </Typography>
     </Grid>
     <Grid container px={2}>
      <Typography variant="body1">
       <b>Email: </b> {paymentDetail?.email}
      </Typography>
     </Grid>
     <Grid container px={2}>
      <Typography variant="body1">
       <b>Hãng: </b> {paymentDetail?.manufacturer}
      </Typography>
     </Grid>
     <Grid container px={2}>
      <Typography variant="body1">
       <b>Biển kiểm soát:</b> {paymentDetail?.licensePlate}
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
          <TableCell>{numberFormat(item.price)}</TableCell>
         </TableRow>
        ))}
        {paymentDetail?.orderDetail?.map((item) => (
         <TableRow>
          <TableCell>
           <b>{item.packageName}</b>
          </TableCell>
          <TableCell>{item.name}</TableCell>
          <TableCell></TableCell>
          <TableCell>{numberFormat(item.price)}</TableCell>
         </TableRow>
        ))}
       </TableBody>
       <TableBody>
        <TableRow></TableRow>
        <TableRow>
         <TableCell></TableCell>
         <TableCell></TableCell>
         <TableCell>Tổng tiền</TableCell>
         <TableCell>{numberFormat(paymentDetail?.totalPrice)}</TableCell>
        </TableRow>
       </TableBody>
      </Table>
     </Grid>
     <DialogActions>
      <Button autoFocus type="reset" onClick={onClose} color="secondary">
       Hủy
      </Button>
      <Button
       autoFocus
       type="submit"
       color="primary"
       onClick={() => paymentByCash(paymentDetail.id)}
       left
      >
       Đã thanh toán
      </Button>
     </DialogActions>
    </Box>
   ) : (
    <Box
     minWidth="768px"
     minHeight="400px"
     display="flex"
     justifyContent="center"
     alignItems="center"
    >
     <LoadingBox>Loading</LoadingBox>
    </Box>
   )}
  </Dialog>
 );
};

export default memo(PaymentCash);
