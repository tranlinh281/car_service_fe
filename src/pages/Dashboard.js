import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import LatestOrders from 'src/components/dashboard//LatestOrders';
import ReportCard from 'src/components/dashboard/ReportCard';
import * as constant from '../utils/Constants';

const Dashboard = () => (
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
        <Grid
          container
          spacing={3}
        >
          <ReportCard />
          <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            <LatestOrders />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Dashboard;
