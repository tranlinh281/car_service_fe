import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "../components/Table";

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
}));

export default function Services() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  return (
    <>
      <div className={classes.appBarSpacer} />
      <p>Dịch vụ</p>
      <Table className={classes.paper} />
    </>
  );
}
