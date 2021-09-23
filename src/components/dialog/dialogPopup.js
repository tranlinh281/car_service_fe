import {
 Button,
 Dialog,
 DialogActions,
 DialogContent,
 DialogTitle,
 makeStyles,
 Typography
} from '@material-ui/core';
import React from 'react';
import * as constant from 'src/utils/Constants';

const useStyles = makeStyles((theme) => ({
 dialog: {
  padding: theme.spacing(2),
  position: 'absolute',
  top: theme.spacing(5)
 },
 dialogTitle: {
  textAlign: 'center'
 },
 dialogContent: {
  textAlign: 'center'
 },
 dialogAction: {
  justifyContent: 'center'
 },
 titleIcon: {
  backgroundColor: theme.palette.secondary.light,
  color: theme.palette.secondary.main,
  '&:hover': {
   backgroundColor: theme.palette.secondary.light,
   cursor: 'default'
  },
  '& .MuiSvgIcon-root': {
   fontSize: '8rem'
  }
 }
}));

export default function PopupDialog(props) {
 const { dialogPopup, setDialogPopup } = props;
 const classes = useStyles();

 return (
  <Dialog open={dialogPopup.isOpen} classes={{ paper: classes.dialog }}>
   <DialogTitle className={classes.dialogTitle}>
    {/* <IconButton disableRipple className={classes.titleIcon}>
                    <NotListedLocationIcon />
                </IconButton> */}
   </DialogTitle>
   <DialogContent className={classes.dialogContent}>
    <Typography variant="h6">{dialogPopup.title}</Typography>
    <Typography variant="subtitle2">{dialogPopup.subTitle}</Typography>
   </DialogContent>
   <DialogActions className={classes.dialogAction}>
    <Button onClick={dialogPopup.onConfirm}>{constant.TITLE_ACCEPTTED}</Button>
   </DialogActions>
  </Dialog>
 );
}
