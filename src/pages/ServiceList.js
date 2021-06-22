import { Helmet } from 'react-helmet';
import { Box, Container, Card, Pagination } from '@material-ui/core';

import * as constant from '../utils/Constants';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listService } from 'src/actions/serviceAction';
import ServiceListToolbar from 'src/components/servicees/ServiceListToolbar';
import ServiceListResults from 'src/components/servicees/ServiceListResults';


const ServiceList = () => {
 const serviceList = useSelector((state) => state.serviceList);
 const { loading, error, services, currentPage, totalPages, totalEmp } =
 serviceList;

 const [page, setPage] = useState(1);
 const triggerReload = useSelector((state) => state.triggerReload);
 //
 const [keySearch, setKeySearch] = useState('');
 const dispatch = useDispatch();

 useEffect(() => {
  dispatch(listService(keySearch, page));
 }, [dispatch, page, keySearch, triggerReload]);

 const handlePageChange = (event, value) => {
  setPage(value);
  setKeySearch(keySearch);
 };

 return (
  <>
   <Helmet>
    <title>{constant.SERVICE_TITLE}</title>
   </Helmet>
   <Box
    sx={{
     backgroundColor: 'background.default',
     minHeight: '100%',
     py: 3
    }}
   >
    <Container maxWidth={false}>
     <ServiceListToolbar setPage={setPage} setKeySearch={setKeySearch} />
     <Box sx={{ pt: 3 }}>
      <Card>
       <ServiceListResults totalPages={totalPages} services={services} />
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

export default ServiceList;