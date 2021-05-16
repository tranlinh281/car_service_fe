import { Grid } from '@material-ui/core';
import React from 'react';
import TotalProfit from './TotalProfit';
import * as constant from '../../utils/Constants';

export default function ReportCard() {
    return (
        <>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
                <TotalProfit sx={{ height: '100%' }} title={constant.ORDERINDAY_TITLE} number={constant.NUMBER_EX} />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
                <TotalProfit sx={{ height: '100%' }} title={constant.ACCEPTED_TITLE} number={constant.NUMBER_EX} />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
                <TotalProfit sx={{ height: '100%' }} title={constant.PROCESSING_TITLE} number={constant.NUMBER_EX} />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
                <TotalProfit sx={{ height: '100%' }} title={constant.ORDERDONE_TITLE} number={constant.NUMBER_EX} />
            </Grid>
        </>
    );
}