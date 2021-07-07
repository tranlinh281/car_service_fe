import { Box, Card, Container, Pagination } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { listEmployee } from 'src/actions/userAction';
import EmployeeListResult from 'src/components/employee/EmployeeListResults';
import EmployeeListToolbar from 'src/components/employee/EmployeeListToolbar';
import EmployeeDialogHOC from 'src/components/_HOCProvider/EmployeeDialogHOC';
import * as constant from '../utils/Constants';

const EmployeeList = () => {
 const { data, error, loading } = useSelector((state) => state.employeeList);
 const [page, setPage] = useState(1);
 const triggerReload = useSelector((state) => state.triggerReload);
 const [keySearch, setKeySearch] = useState('');
 const dispatch = useDispatch();

 useEffect(() => {
  dispatch(listEmployee(keySearch, page));
 }, [dispatch, page, keySearch, triggerReload]);

 const handlePageChange = (_, page) => {
  setPage(page);
  setKeySearch(keySearch);
 };

 return (
  <>
   <EmployeeDialogHOC>
    <Helmet>
     <title>{constant.EMPLOYEE_TITLE}</title>
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
        <EmployeeListResult
         employees={!error ? data.itemsList : []}
         errorMessage={error}
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
   </EmployeeDialogHOC>
  </>
 );
};

export default EmployeeList;
