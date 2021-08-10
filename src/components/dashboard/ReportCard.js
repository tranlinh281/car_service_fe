import { Grid } from '@material-ui/core';
import React from 'react';
import TotalProfit from './TotalProfit';
import * as constant from '../../utils/Constants';

export default function ReportCard() {
    return (
        <>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
                <TotalProfit sx={{ height: '100%' }} title={constant.ORDERINDAY_TITLE} number={constant.NUMBER_EX} colorBack='#5664d2'/>
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
                <TotalProfit sx={{ height: '100%' }} title={constant.ACCEPTED_TITLE} number={constant.NUMBER_EX} colorBack='#11A7BB'/>
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
                <TotalProfit sx={{ height: '100%' }} title={constant.PROCESSING_TITLE} number={constant.NUMBER_EX} colorBack='#DE9230'/>
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
                <TotalProfit sx={{ height: '100%' }} title={constant.ORDERDONE_TITLE} number={constant.NUMBER_EX} colorBack='#31ED31'/>
            </Grid>
        </>
    );
}