import { Box, Card, Container, Pagination } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import PackageDialogHOC from 'src/components/_HOCProvider/PackageDialogHOC';
import * as constant from '../utils/Constants';
import PackageListToolbar from './../components/packages/PackageListToolbar';
import { listPackage } from './../actions/packageAction';
import PackageListResult from 'src/components/packages/PackageListResult';

const PackageList = () => {
 const { data, error, loading } = useSelector((state) => state.packageList);
 const [page, setPage] = useState(1);
 const triggerReload = useSelector((state) => state.triggerReload);
 const [keySearch, setKeySearch] = useState('');
 const dispatch = useDispatch();

 useEffect(() => {
  dispatch(listPackage(keySearch, page));
 }, [dispatch, page, keySearch, triggerReload]);

 const handlePageChange = (_, page) => {
  setPage(page);
  setKeySearch(keySearch);
 };

 return (
  <>
   <PackageDialogHOC>
    <Helmet>
     <title>{constant.PACKAGE_SERVICE_TITLE}</title>
    </Helmet>
    <Box
     sx={{
      backgroundColor: 'background.default',
      minHeight: '100%',
      py: 3
     }}
    >
     <Container maxWidth={false}>
      <PackageListToolbar setPage={setPage} setKeySearch={setKeySearch} />
      <Box sx={{ pt: 3 }}>
       <Card>
        <PackageListResult
         packages={data.itemsList || []}
         totalPages={data.totalPages || 0}
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
   </PackageDialogHOC>
  </>
 );
};

export default PackageList;
