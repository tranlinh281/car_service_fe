import { Helmet } from 'react-helmet';
import { Box, Container, Card, Pagination } from '@material-ui/core';
import EmployeeListToolbar from 'src/components/employee/EmployeeListToolbar';
import EmployeeListResult from 'src/components/employee/EmployeeListResults';
import * as constant from '../utils/Constants';
import { listEmployee } from 'src/actions/userAction';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AlignCenter } from 'react-feather';

const EmployeeList = () => {
    const employeeList = useSelector((state) => state.employeeList);
    const { loading, error, employees, currentPage, totalPages, totalEmp } =
        employeeList;

    const [page, setPage] = useState(1);
    const triggerReload = useSelector((state) => state.triggerReload);
    //
    const [keySearch, setKeySearch] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listEmployee(keySearch, page));
    }, [dispatch, page, keySearch, triggerReload]);

    const handlePageChange = (event, value) => {
        setPage(value);
        setKeySearch(keySearch);
    };

    return (
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
                    <EmployeeListToolbar setPage={setPage} setKeySearch={setKeySearch} />
                    <Box sx={{ pt: 3 }}>
                     
                        <Card>
                            <EmployeeListResult
                                loading={loading}
                                totalPages={totalPages}
                                employees={employees}
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
                                    count={totalPages}
                                    size="medium"
                                    onChange={handlePageChange}
                                    page={page}
                                    hidden={loading}
                                />
                            </Box>
                        </Card>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default EmployeeList;