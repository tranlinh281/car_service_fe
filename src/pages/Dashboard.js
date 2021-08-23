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
    <Typography>Đơn trong ngày</Typography>
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
