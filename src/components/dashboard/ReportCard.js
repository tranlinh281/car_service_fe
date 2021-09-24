import { Button, Grid } from '@material-ui/core';
import { React, useEffect, useState } from 'react';
import ReportCards from './ReportCards';
import * as constant from '../../utils/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { listAllOrder } from 'src/actions/orderAction';
import { listAllDayTransaction } from 'src/actions/transactionAction';

export default function ReportCard() {
 const { orders } = useSelector((state) => state.ordersList);
 const { data } = useSelector((state) => state.transactionAllList);
 listAllDayTransaction;
 const dispatch = useDispatch();

 useEffect(() => {
  dispatch(listAllOrder());
  dispatch(listAllDayTransaction());
 }, [dispatch]);

 return (
  <>
   <Grid item lg={3} sm={6} xl={3} xs={12}>
    <ReportCards
     sx={{ height: '100%' }}
     title={constant.ORDERINDAY_TITLE}
     number={orders.dateTimeCount}
     colorBack="#5664d2"
    />
   </Grid>
   <Grid item lg={3} sm={6} xl={3} xs={12}>
    <ReportCards
     sx={{ height: '100%' }}
     title={constant.ACCEPTED_TITLE}
     number={orders.accept}
     colorBack="#11A7BB"
    />
   </Grid>
   <Grid item lg={3} sm={6} xl={3} xs={12}>
    <ReportCards
     sx={{ height: '100%' }}
     title={constant.PROCESSING_TITLE}
     number={orders.processingDate}
     colorBack="#DE9230"
    />
   </Grid>
   <Grid item lg={3} sm={6} xl={3} xs={12}>
    <ReportCards
     sx={{ height: '100%' }}
     title={constant.ORDERDONE_TITLE}
     number={data.totalCountDate}
     colorBack="#31ED31"
    />
   </Grid>
  </>
 );
}
