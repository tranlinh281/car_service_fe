import { Box, Card, Container, Pagination } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { listTransaction } from 'src/actions/transactionAction';
import PaymentListResults from 'src/components/payment/PaymentListResults';
import PaymentListToolbar from 'src/components/payment/PaymentListToolbar';
import CustomerDialogHOC from 'src/components/_HOCProvider/CustomerDialogHOC';
import * as constant from '../utils/Constants';

const OrderPaymentList = () => {
 const { data, error, loading } = useSelector((state) => state.transactionList);
 const [page, setPage] = useState(1);
 const triggerReload = useSelector((state) => state.triggerReload);
 const [keySearch, setKeySearch] = useState('');
 const dispatch = useDispatch();

 useEffect(() => {
  dispatch(listTransaction(keySearch, page));
 }, [dispatch, page, keySearch, triggerReload]);

 const handlePageChange = (_, page) => {
  setPage(page);
  setKeySearch(keySearch);
 };

 console.log(data, 'debug console transaction');
 return (
  <>
   <CustomerDialogHOC>
    <Helmet>
     <title>{constant.ORDER_PAYMENT_TITLE}</title>
    </Helmet>
    <Box
     sx={{
      backgroundColor: 'background.default',
      minHeight: '100%',
      py: 3
     }}
    >
     <Container maxWidth={false}>
      <PaymentListToolbar setPage={setPage} setKeySearch={setKeySearch} />
      <Box sx={{ pt: 3 }}>
       <Card>
        <PaymentListResults
         //  totalPages={data.totalPages || 0}
         transactions={data.itemsList || []}
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
          count={data.totalPages || 0}
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

export default OrderPaymentList;
