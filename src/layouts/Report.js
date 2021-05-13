import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ProcessingOrders from "../components/ProcessingOrders";

const useStyles = makeStyles((theme) => ({
  
  appBarSpacer: theme.mixins.toolbar,
  
}));

export default function Report() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);


  return (
    <>
      <div className={classes.appBarSpacer} />
      <p>Báo cáo</p>
      
    </>
  );
}
