import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import ReportCard from 'src/components/dashboard/ReportCard';
import * as constant from '../utils/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { listAllOrder } from 'src/actions/orderAction';
import { triggerReload } from 'src/actions/userAction';

const Dashboard = () => {

 return (
  <>
   <Helmet>
    <title>{constant.DASHBOARD_TITLE}</title>
   </Helmet>
   <Box
    sx={{
     backgroundColor: 'background.default',
     minHeight: '100%',
     py: 3
    }}
   >
    <Container maxWidth={false}>
     <Grid container spacing={3}>
      <ReportCard />
     </Grid>
    </Container>
   </Box>
  </>
 );
};

export default Dashboard;
