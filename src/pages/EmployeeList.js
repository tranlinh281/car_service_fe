import { Helmet } from 'react-helmet';
import { Box, Container, Card, Pagination } from '@material-ui/core';
import EmployeeListToolbar from 'src/components/employee/EmployeeListToolbar';
import EmployeeListResult from 'src/components/employee/EmployeeListResults';
import * as constant from '../utils/Constants';
import { listEmployee } from 'src/actions/userAction';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AlignCenter } from 'react-feather';
import EmployeeDialogHOC from 'src/components/_HOCProvider/EmployeeDialogHOC';

const EmployeeList = () => {
 const { data } = useSelector((state) => state.employeeList);
 const [page, setPage] = useState(data.currentPage || 1);
 const triggerReload = useSelector((state) => state.triggerReload);
 //
 const [keySearch, setKeySearch] = useState('');
 const dispatch = useDispatch();

 useEffect(() => {
  dispatch(listEmployee(keySearch, page));

 }, [dispatch, page, keySearch, triggerReload]);

 const handlePageChange = (value) => {  
  setPage(value);
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
         totalPages={data.totalPages || 0}
         employees={data.itemsList || []}
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
