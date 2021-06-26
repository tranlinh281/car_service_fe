import { Box, Card, Container, Pagination } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { listAccessory } from 'src/actions/accessoryAction';
import AccessoryListResults from 'src/components/accessories/AccessoryListResults';
import AccessoryListToolbar from 'src/components/accessories/AccessoryListToolbar';
import EditAccessoryDialogHOC from 'src/components/_HOCProvider/EditAccessoryDialogHOC';
import * as constant from '../utils/Constants';

const AccessoryList = () => {
 const accessoryList = useSelector((state) => state.accessoryList);
 const { loading, error, accessories, currentPage, totalPages, totalEmp } =
  accessoryList;

 const [page, setPage] = useState(1);
 const triggerReload = useSelector((state) => state.triggerReload);
 const [keySearch, setKeySearch] = useState('');
 const dispatch = useDispatch();

 useEffect(() => {
  dispatch(listAccessory(keySearch, page));
 }, [dispatch, page, keySearch, triggerReload]);

 const handlePageChange = (event, value) => {
  setPage(value);
  setKeySearch(keySearch);
 };

 return (
  <>
   <EditAccessoryDialogHOC>
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
         totalPages={totalPages}
         accessories={accessories}
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
   </EditAccessoryDialogHOC>
  </>
 );
};

export default AccessoryList;
