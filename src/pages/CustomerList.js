import { Helmet } from 'react-helmet';
import { Box, Container, Card, Pagination } from '@material-ui/core';
import EmployeeListToolbar from 'src/components/employee/EmployeeListToolbar';
import EmployeeListResult from 'src/components/employee/EmployeeListResults';
import * as constant from '../utils/Constants';
import { listEmployee } from 'src/actions/userAction';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listCustomer } from 'src/actions/customerAction';

const CustomerList = () => {
 const customerList = useSelector((state) => state.customerList);
 const { loading, error, customers, currentPage, totalPages, totalEmp } =
  customerList;

 const [page, setPage] = useState(1);
 const triggerReload = useSelector((state) => state.triggerReload);
 //
 const [keySearch, setKeySearch] = useState('');
 const dispatch = useDispatch();

 useEffect(() => {
  dispatch(listCustomer(keySearch, page));
 }, [dispatch, page, keySearch, triggerReload]);

 const handlePageChange = (event, value) => {
  setPage(value);
  setKeySearch(keySearch);
 };

 return (
  <>
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
     <EmployeeListToolbar setPage={setPage} setKeySearch={setKeySearch} />
     <Box sx={{ pt: 3 }}>
      <Card>
       <EmployeeListResult totalPages={totalPages} employees={customers} />
       <Box
        sx={{
         display: 'flex',
         justifyContent: 'center',
         pt: 2
        }}
       >
        <Pagination
         color="primary"
         count={totalPages}
         size="medium"
         onChange={handlePageChange}
         page={page}
        />
       </Box>
      </Card>
     </Box>
    </Container>
   </Box>
  </>
 );
};

export default CustomerList;
