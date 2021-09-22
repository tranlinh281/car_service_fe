import { Box, Card, Container, Pagination } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { listAllOrderWithStatusDone } from 'src/actions/orderAction';
import HistoryListResults from 'src/components/history/HistoryListResults';
import CustomerDialogHOC from 'src/components/_HOCProvider/CustomerDialogHOC';
import * as constant from '../utils/Constants';

const OrderHistoryList = () => {
 const { orders, error, loading } = useSelector(
  (state) => state.orderStatusList
 );
 const [page, setPage] = useState(1);
 const triggerReload = useSelector((state) => state.triggerReload);
 const dispatch = useDispatch();

 useEffect(() => {
  dispatch(listAllOrderWithStatusDone(page));
 }, [dispatch, page, triggerReload]);

 const handlePageChange = (_, page) => {
  setPage(page);
 };

 return (
  <>
   <CustomerDialogHOC>
    <Helmet>
     <title>{constant.ORDER_HISTORY_TITLE}</title>
    </Helmet>
    <Box
     sx={{
      backgroundColor: 'background.default',
      minHeight: '100%',
      py: 3
     }}
    >
     <Container maxWidth={false}>
      <Box sx={{ pt: 3 }}>
       <Card>
        <HistoryListResults
         //totalPages={data.totalPages || 0}
         orders={orders.itemsList || []}
         loading={loading}
        />
        <Box
         sx={{
          display: 'flex',
          justifyContent: 'center',
          pt: 2
         }}
        >
         <Pagination
          color="primary"
          // count={data.totalPages || 0}
          size="medium"
          onChange={handlePageChange}
          page={page}
         />
        </Box>
       </Card>
      </Box>
     </Container>
    </Box>
   </CustomerDialogHOC>
  </>
 );
};

export default OrderHistoryList;
