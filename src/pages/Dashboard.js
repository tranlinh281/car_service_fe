import { Box, Container, Grid, Typography } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import ReportCard from 'src/components/dashboard/ReportCard';
import * as constant from '../utils/Constants';
import BarChartDashBoard from './BarChartDashBoard';

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
    <h1>Đơn trong ngày</h1>
    <Container maxWidth={false}>
     <Grid container spacing={3}>
      <ReportCard />
     </Grid>
     <Box>
      <BarChartDashBoard xs={3} />
     </Box>
    </Container>
   </Box>
  </>
 );
};

export default Dashboard;
