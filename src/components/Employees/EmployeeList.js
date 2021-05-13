import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
}));

export default function EmployeeList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);


  return (
    <>
      <div className={classes.appBarSpacer} />
      <p>Staff list</p>
      
    </>
  );
}
