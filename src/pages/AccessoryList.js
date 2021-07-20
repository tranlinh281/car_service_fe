import { Box, Card, Container, Pagination } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { listAccessory } from 'src/actions/accessoryAction';
import AccessoryListResults from 'src/components/accessories/AccessoryListResults';
import AccessoryListToolbar from 'src/components/accessories/AccessoryListToolbar';
import AccessoryDialogHOC from 'src/components/_HOCProvider/AccessoryDialogHOC';
import * as constant from '../utils/Constants';

const AccessoryList = () => {
 const { data, error, loading } = useSelector((state) => state.accessoryList);
 const [page, setPage] = useState(1);
 const triggerReload = useSelector((state) => state.triggerReload);
 const [keySearch, setKeySearch] = useState('');
 const dispatch = useDispatch();

 useEffect(() => {
  dispatch(listAccessory(keySearch, page));
 }, [dispatch, page, keySearch, triggerReload]);
 const handlePageChange = (_, value) => {
  setPage(value);
  setKeySearch(keySearch);
 };

 return (
  <AccessoryDialogHOC>
   <Helmet>
    <title>{constant.ACCESSORIES_TITLE}</title>
   </Helmet>
   <Box
    sx={{
     backgroundColor: 'background.default',
     minHeight: '100%',
     py: 3
    }}
   >
    <Container maxWidth={false}>
     <AccessoryListToolbar setPage={setPage} setKeySearch={setKeySearch} />
     <Box sx={{ pt: 3 }}>
      <Card>
       <AccessoryListResults
        totalPages={data.totalPages || 0}
        accessories={data.itemsList || []}
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
  </AccessoryDialogHOC>
 );
};

export default AccessoryList;
