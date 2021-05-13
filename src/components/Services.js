import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
}));

export default function Service() {
  const classes = useStyles();


  return (
    <>
      <div className={classes.appBarSpacer} />
      <p>Service list</p>
    </>
  );
}
