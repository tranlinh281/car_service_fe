import { Box, Container, Grid } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import ReportCard from 'src/components/dashboard/ReportCard';
import * as constant from '../utils/Constants';
import BarChartReport from './BarChartReport';


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
      <BarChartReport />
     </Grid>
    </Container>
   </Box>
  </>
 );
};

export default Dashboard;
