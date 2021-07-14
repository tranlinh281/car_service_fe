import React from 'react';
import {
 Dialog,
 DialogTitle,
 DialogContent,
 DialogActions,
 Typography,
 makeStyles,
 Grid,
 Button
} from '@material-ui/core';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';

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
  justifyContent: 'center',
  margin: theme.spacing(1.5),
  right: theme.spacing(2)
 },
 Button: {
  padding: theme.spacing(2),
  margin: '0 5px',
  display: 'flex',
  justifyContent: 'flex-start'
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

export default function ConfirmDialog(props) {
 const { confirmDialog, setConfirmDialog } = props;
 const classes = useStyles();

 return (
  <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
   <DialogContent className={classes.dialogContent}>
    <Typography variant="h6">{confirmDialog.title}</Typography>
    <Typography variant="subtitle2">{confirmDialog.subTitle}</Typography>
   </DialogContent>
   <DialogActions className={classes.dialogAction}>
    <Button className={classes.Button} onClick={confirmDialog.onConfirm}>
     Đồng ý
    </Button>
    <Button
     color="secondary"
     onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
    >
     Hủy
    </Button>
   </DialogActions>
  </Dialog>
 );
}
