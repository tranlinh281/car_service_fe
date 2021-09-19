import { Box, Grid } from '@material-ui/core';
import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listAllTransaction } from 'src/actions/transactionAction';
import * as constant from '../../utils/Constants';
import TotalProfits from './TotalProfits';
export default function CardOfProfit() {
 const { data } = useSelector((state) => state.transactionAllList);
 const dispatch = useDispatch();

 console.log(data, 'debug card of profit');
 useEffect(() => {
  dispatch(listAllTransaction());
 }, [dispatch]);

 return (
  <>
   <Grid item xs={12}>
    <TotalProfits
     sx={{ height: '100%' }}
     title={constant.TOTAL_PROFIT_TODAY}
     number={data.totalDate}
     colorBack="#5664d2"
    />
   </Grid>

   <Box
    sx={{
     py: 7
    }}
   >
    {/* <Grid xs={12} justifyContent="space-around">
     <TotalProfits
      sx={{ height: '150%' }}
      title={constant.TOTAL_PROFIT_WEEK}
      //   number={orders.accept}
      colorBack="#5664d2"
     />
    </Grid> */}
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
      number={data.totalMonth}
      colorBack="#DE9230"
     />
    </Grid>
   </Box>
  </>
 );
}
