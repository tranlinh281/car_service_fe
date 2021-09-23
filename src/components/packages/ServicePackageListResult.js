import {
 Box,
 Collapse,
 IconButton,
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableRow
} from '@material-ui/core';
import { Close, Edit } from '@material-ui/icons';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deletePackage } from 'src/actions/packageAction';
import { DialogContext } from 'src/contexts/dialogContexts/DialogUpdateAccessoryContextProvider';
import { servicePackageHeader } from 'src/services/HeaderTitleTable';
import ButtonAction from '../ButtonAction';
import ConfirmDialog from '../dialog/dialogConfirm';
import * as constant from 'src/utils/Constants';

const numberFormat = (value) =>
 new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(
  value
 );

export default function ServicePackageListResult({ packagee = {} }) {
 const [confirmDialog, setConfirmDialog] = useState({
  isOpen: false,
  title: '',
  subTitle: ''
 });
 console.log(packagee, 'debug service package');
 const dispatch = useDispatch();
 const [open, setOpen] = React.useState(false);

 const deleteHandler = (packagee) => {
  dispatch(deletePackage(packagee.id));
 };

 const {
  setShouldCreatePackageDialogOpen,
  setShouldUpdatePackageDialogOpen,
  setUpdatePackageDefaultValue
 } = useContext(DialogContext);

 //edit package
 const handleOpenEditDialog = (editData) => {
  setShouldUpdatePackageDialogOpen(true);
  setUpdatePackageDefaultValue(editData);
 };

 return (
  <>
   <TableRow hover key={packagee.name}>
    <TableCell>{packagee.name}</TableCell>
    <TableCell>{packagee.description}</TableCell>
    {packagee.price === 0 ? (
     <TableCell>N/A</TableCell>
    ) : (
     <TableCell>{numberFormat(packagee.price)}</TableCell>
    )}

    <TableCell>
     <ButtonAction
      variant="contained"
      color="primary"
      onClick={() => handleOpenEditDialog(packagee)}
     >
      <Edit fontSize="small" color="primary" />
     </ButtonAction>
     <ButtonAction
      color="secondary"
      onClick={() => {
       setConfirmDialog({
        isOpen: true,
        title: constant.TITLE_CONFIRM_DELETE,
        onConfirm: () => {
         deleteHandler(packagee), setConfirmDialog({ isOpen: false });
        }
       });
      }}
     >
      <Close fontSize="small" color="secondary" />
     </ButtonAction>
    </TableCell>
    <TableCell>
     <IconButton
      aria-label="expand row"
      size="small"
      onClick={() => setOpen(!open)}
     >
      {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
     </IconButton>
    </TableCell>
   </TableRow>
   <TableRow>
    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
     <Collapse in={open} id={packagee.name} timeout="auto" unmountOnExit>
      <Box margin={1}>
       <Table size="small" aria-label="purchases">
        <TableHead>
         <TableRow>
          {servicePackageHeader.map((headCell) => (
           <TableCell key={headCell.id}>{headCell.title}</TableCell>
          ))}
         </TableRow>
        </TableHead>
        <TableBody>
         {packagee.services?.map((service) => (
          <TableRow key={service.name}>
           <TableCell>{service.name}</TableCell>
           {service.price === 0 ? (
            <TableCell>N/A</TableCell>
           ) : (
            <TableCell>{numberFormat(service.price)}</TableCell>
           )}
           <TableCell>{service.type}</TableCell>
          </TableRow>
         ))}
        </TableBody>
       </Table>
      </Box>
     </Collapse>
    </TableCell>
   </TableRow>
   <ConfirmDialog
    confirmDialog={confirmDialog}
    setConfirmDialog={setConfirmDialog}
   />
  </>
 );
}
