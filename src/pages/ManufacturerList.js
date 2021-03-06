import { Helmet } from 'react-helmet';
import { Box, Container, Card, Pagination, Grid } from '@material-ui/core';
import * as constant from '../utils/Constants';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ManufacturerListResults from 'src/components/manufacturer/ManufacturerListResults';
import { listManufacturer } from 'src/actions/manufacturerAction';
import ManufacturerListToolbar from './../components/manufacturer/ManufacturerListToolbar';
import ManufacturerDialogHOC from 'src/components/_HOCProvider/ManufacturerDialogHOC';

const Manufacturer = () => {
 const manufacturerList = useSelector((state) => state.manufacturerList);
 const { loading, error, data } = manufacturerList;
 const [page, setPage] = useState(1);
 const triggerReload = useSelector((state) => state.triggerReload);
 const [keySearch, setKeySearch] = useState('');
 const dispatch = useDispatch();

 useEffect(() => {
  dispatch(listManufacturer(keySearch, page));
 }, [dispatch, page, keySearch, triggerReload]);
 const handlePageChange = (_, value) => {
  setPage(value);
  setKeySearch(keySearch);
 };
 return (
  <>
   <ManufacturerDialogHOC>
    <Helmet>
     <title>{constant.MANUFACTURER_TITLE}</title>
    </Helmet>
    <Box
     sx={{
      backgroundColor: 'background.default',
      minHeight: '100%',
      py: 3
     }}
    >
     <Container maxWidth={false}>
      <ManufacturerListToolbar setPage={setPage} setKeySearch={setKeySearch} />
      <Box sx={{ pt: 3 }}>
       {/* <Card> */}
       
        <ManufacturerListResults
         totalPages={data.totalPages || 0}
         manufacturers={data.itemsList || []}
         loading={loading}
        />
        </Box>
        <Box
         sx={{
          display: 'flex',
          justifyContent: 'center',
          pt: 3
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
       {/* </Card> */}
      {/* </Box> */}
     </Container>
    </Box>
   </ManufacturerDialogHOC>
  </>
 );
};

export default Manufacturer;
