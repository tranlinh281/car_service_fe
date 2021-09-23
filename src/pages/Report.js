import { Box, Container } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import * as constant from '../utils/Constants';

const Report = () => (
 <>
  <Helmet>
   <title>{constant.REPORT_TITLE}</title>
  </Helmet>
  <p>Report</p>
  <Box
   sx={{
    backgroundColor: 'background.default',
    minHeight: '100%',
    py: 3
   }}
  >
   <Container maxWidth={false}></Container>
  </Box>
 </>
);

export default Report;
