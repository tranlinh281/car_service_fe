import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ReportTab from '../components/ReportTab';
import ProcessingOrders from '../components/ProcessingOrders';

const useStyles = makeStyles((theme) => ({

  appBarSpacer: theme.mixins.toolbar,
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  }
}));

export default function Dashboard() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <ReportTab></ReportTab>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <ProcessingOrders />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}