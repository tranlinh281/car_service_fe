import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import customers from 'src/__mocks__/customers';
import EmployeeListToolbar from 'src/components/employee/EmployeeListToolbar';
import EmployeeListResult from 'src/components/employee/EmployeeListResults';
import * as constant from '../utils/Constants';

const EmployeeList = () => (
  <>
    <Helmet>
      <title>{constant.EMPLOYEE_TITLE}</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <EmployeeListToolbar />
        <Box sx={{ pt: 3 }}>
          <EmployeeListResult customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
);

export default EmployeeList;
