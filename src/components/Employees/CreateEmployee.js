import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ProcessingOrders from "../ProcessingOrders";


const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
}));


export default function CreateEmployee() {
    const classes = useStyles();

    return (
        <>
        <div className={classes.appBarSpacer} />
        <p>Staff list</p>
        
      </>
    );
}