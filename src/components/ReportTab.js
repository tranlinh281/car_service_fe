import { Grid, makeStyles, Paper } from '@material-ui/core'
import clsx from 'clsx';
import React from 'react'

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 100,
    },
    colorOrderInDay: {
        backgroundColor: 'gray',
        height: 100,
    },
    colorCheckIn: {
        backgroundColor: '#1A9CF9',
        height: 100,
    },
    colorProcessing: {
        backgroundColor: '#F9A303',
        height: 100,
    },
    colorDone: {
        backgroundColor: '#03F962',
        height: 100,
    }
}));

export default function ReportTab() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <>
            <Grid item xs={12} md={12} lg={3}>
                <Paper className={fixedHeightPaper, classes.colorOrderInDay}>
                    Số đơn trong ngày
               </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={3}>
                <Paper className={fixedHeightPaper, classes.colorCheckIn}>
                    Số đơn đã nhân
               </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={3}>
                <Paper className={fixedHeightPaper, classes.colorProcessing}>
                    Số đơn đang làm
               </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={3}>
                <Paper className={fixedHeightPaper, classes.colorDone}>
                    Số đơn đã hoàn thành
               </Paper>
            </Grid>
        </>
    )
}