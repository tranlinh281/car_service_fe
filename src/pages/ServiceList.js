import { Helmet } from 'react-helmet';
import { Box, Container, Card, Pagination } from '@material-ui/core';

import * as constant from '../utils/Constants';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listService } from 'src/actions/serviceAction';
import ServiceListToolbar from 'src/components/servicees/ServiceListToolbar';
import ServiceListResults from 'src/components/servicees/ServiceListResults';
import ServiceDialogHOC from 'src/components/_HOCProvider/ServiceDialogHOC';

const ServiceList = () => {
 const { data, error, loading } = useSelector((state) => state.serviceList);
 const [page, setPage] = useState(1);
 const triggerReload = useSelector((state) => state.triggerReload);

 const [keySearch, setKeySearch] = useState('');
 const dispatch = useDispatch();

 useEffect(() => {
  dispatch(listService(keySearch, page));
 }, [dispatch, page, keySearch, triggerReload]);

 const handlePageChange = (_, value) => {
  setPage(value);
  setKeySearch(keySearch);
 };
 console.log(keySearch, 'debug list');

 return (
  <>
   <ServiceDialogHOC>
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
        <ServiceListResults
         totalPages={data.totalPages || 0}
         services={data.itemsList || []}
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
          count={data.totalPages}
          size="medium"
          onChange={handlePageChange}
          page={page}
         />
        </Box>
       </Card>
      </Box>
     </Container>
    </Box>
   </ServiceDialogHOC>
  </>
 );
};

export default ServiceList;
