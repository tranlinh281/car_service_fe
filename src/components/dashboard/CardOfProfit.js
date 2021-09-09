import { Box, Grid } from '@material-ui/core';
import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listAllOrder } from 'src/actions/orderAction';
import * as constant from '../../utils/Constants';
import TotalProfits from './TotalProfits';

export default function CardOfProfit() {
 const { orders } = useSelector((state) => state.ordersList);
 const dispatch = useDispatch();

 useEffect(() => {
  dispatch(listAllOrder());
 }, [dispatch]);

 return (
  <>
   <Grid item xs={12}>
    <TotalProfits
     sx={{ height: '100%' }}
     title={constant.TOTAL_PROFIT_TODAY}
     number={orders.dateTimeCount}
     colorBack="#5664d2"
    />
   </Grid>

   <Box
    sx={{
     py: 7
    }}
   >
    <Grid xs={12} justifyContent="space-around">
     <TotalProfits
      sx={{ height: '150%' }}
      title={constant.TOTAL_PROFIT_WEEK}
      number={orders.accept}
      colorBack="#5664d2"
     />
    </Grid>
   </Box>
   <Box
    sx={{
     justifyContent: 'flex-end'
    }}
   >
    <Grid xs={12}>
     <TotalProfits
      sx={{ height: '100%' }}
      title={constant.TOTAL_PROFIT_MOTH}
      number={orders.processingDate}
      colorBack="#DE9230"
     />
    </Grid>
   </Box>
  </>
 );
}
