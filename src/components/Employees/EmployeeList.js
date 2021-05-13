import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "../Table";

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
}));

export default function EmployeeList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);


  return (
    <>
    <p>nhân viên</p>
    <div className={classes.appBarSpacer} />
      <Table className={classes.paper}/>
  </>
  );
}
