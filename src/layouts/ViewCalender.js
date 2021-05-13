import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Calender from "../components/Calender";

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
}));

export default function ViewCalender() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  return (
    <>
      <div className={classes.appBarSpacer} />
      <p>lịch</p>
      <Calender className={classes.paper} />
    </>
  );
}
