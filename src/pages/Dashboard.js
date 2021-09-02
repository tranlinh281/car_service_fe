import { Box, Container, Grid } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import ReportCard from 'src/components/dashboard/ReportCard';
import TrafficByDevice from '../components/dashboard/TrafficByDevice';
import BarChartDashBoard from './BarChartDashBoard';
const Dashboard = () => (
 <>
  <Helmet>
   <title>Dashboard | Material Kit</title>
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
     <Grid item lg={8} md={12} xl={9} xs={12}>
      <BarChartDashBoard />
     </Grid>
     <Grid item lg={4} md={6} xl={3} xs={12}>
      <TrafficByDevice sx={{ height: '100%' }} />
     </Grid>
    </Grid>
   </Container>
  </Box>
 </>
);

export default Dashboard;
