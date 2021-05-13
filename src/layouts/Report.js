import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "../components/Table";

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
}));

export default function Report() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  return (
    <>
      <div className={classes.appBarSpacer} />
        <Table className={classes.paper}/>
    </>
  );
}
