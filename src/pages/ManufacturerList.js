import { Helmet } from 'react-helmet';
import { Box, Container, Card, Pagination } from '@material-ui/core';
import * as constant from '../utils/Constants';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ManufacturerListResults from 'src/components/manufacturer/ManufacturerListResults';
import { listManufacturer } from 'src/actions/manufacturerAction';

const Manufacturer = () => {
    const manufacturerList = useSelector((state) => state.manufacturerList);
    const { loading, error, manufacturers} = manufacturerList;
    const triggerReload = useSelector((state) => state.triggerReload);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(listManufacturer());
    }, [dispatch, triggerReload]);

  
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
                    <Box sx={{ pt: 3 }}>
                        <Card>
                            <ManufacturerListResults
                                manufacturers={manufacturers}
                            />
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    pt: 2
                                }}
                            >
                            </Box>
                        </Card>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default Manufacturer;