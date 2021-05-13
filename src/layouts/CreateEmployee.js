import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ProcessingOrders from "../components/ProcessingOrders";


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://i.pinimg.com/564x/c5/50/5d/c5505d8ab2ef0ee40102ae95c11e6fbd.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#fff',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
    }, 
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const handleSubmit = (e) => {
    e.preventDefault();

    this.props.history.push("/staff/workingSchedule");

};

export default function CreateEmployee() {
    const classes = useStyles();

    return (
        <>
        <div className={classes.appBarSpacer} />
        <p>Staff list</p>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
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