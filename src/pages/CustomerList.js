import { Helmet } from 'react-helmet';
import { Box, Container, Card, Pagination } from '@material-ui/core';
import EmployeeListToolbar from 'src/components/employee/EmployeeListToolbar';
import EmployeeListResult from 'src/components/employee/EmployeeListResults';
import * as constant from '../utils/Constants';
import { listEmployee } from 'src/actions/userAction';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listCustomer } from 'src/actions/customerAction';
import CustomerListToolbar from 'src/components/customer/CustomerListToolbar';
import CustomerListResults from 'src/components/customer/CustomerListResults';
import CustomerDialogHOC from 'src/components/_HOCProvider/CustomerDialogHOC';

const CustomerList = () => {
 const { data, error, loading } = useSelector((state) => state.customerList);
 const [page, setPage] = useState(1);
 const triggerReload = useSelector((state) => state.triggerReload);
 const [keySearch, setKeySearch] = useState('');
 const dispatch = useDispatch();

 useEffect(() => {
  dispatch(listCustomer(keySearch, page));
 }, [dispatch, page, keySearch, triggerReload]);

 const handlePageChange = (_, page) => {
  setPage(page);
  setKeySearch(keySearch);
 };

 return (
  <>
   <CustomerDialogHOC>
    <Helmet>
     <title>{constant.CUS_TITLE}</title>
    </Helmet>
    <Box
     sx={{
      backgroundColor: 'background.default',
      minHeight: '100%',
      py: 3
     }}
    >
     <Container maxWidth={false}>
      <CustomerListToolbar setPage={setPage} setKeySearch={setKeySearch} />
      <Box sx={{ pt: 3 }}>
       <Card>
        <CustomerListResults
         totalPages={data.totalPages || 0}
         customers={data.itemsList || []}
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

export default CustomerList;
