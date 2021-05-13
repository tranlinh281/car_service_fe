import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "../components/Table";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  }
}));

export default function CustomerList() {
  const classes = useStyles();


  return (
    <>
      <div className={classes.appBarSpacer} />
      <p>Customer list</p>
        <Table className={classes.paper}/>
    </>
  );
}
