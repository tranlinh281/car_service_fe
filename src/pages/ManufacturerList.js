import { Helmet } from 'react-helmet';
import { Box, Container, Card, Pagination } from '@material-ui/core';
import * as constant from '../utils/Constants';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ManufacturerListResults from 'src/components/manufacturer/ManufacturerListResults';
import { listManufacturer } from 'src/actions/manufacturerAction';

const Manufacturer = () => {
    const manufacturerList = useSelector((state) => state.manufacturerList);
    const { loading, error, manufacturers, currentPage, totalPages, totalEmp } =
    manufacturerList;

    const [page, setPage] = useState(1);    
    const triggerReload = useSelector((state) => state.triggerReload);
    //
    const [keySearch, setKeySearch] = useState("");
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(listManufacturer(keySearch, page));
    }, [dispatch, page, keySearch, triggerReload]);

    const handlePageChange = (event, value) => {
        setPage(value);
        setKeySearch(keySearch);
    };

    return (
        <>
            <Helmet>
                <title>{constant.MANUFACTURER_TITLE}</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',  
                    py: 3
                }}
            >
                <Container maxWidth={false}>
                    <ManufacturerListResults setPage={setPage} setKeySearch={setKeySearch} />
                    <Box sx={{ pt: 3 }}>
                        <Card>
                            <ManufacturerListResults
                                totalPages={totalPages}
                                employees={manufacturers}
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
                                />
                            </Box>
                        </Card>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default Manufacturer;