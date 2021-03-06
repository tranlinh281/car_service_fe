import { TableCell, TableRow } from '@material-ui/core';
import { Payments } from '@material-ui/icons';
import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { listAllOrderWithID } from 'src/actions/orderAction';
import { DialogContext } from 'src/contexts/dialogContexts/DialogUpdateAccessoryContextProvider';
import ButtonAction from '../ButtonAction';

export default function PaymentExpandListResult({ customer = {} }) {
 const { setShouldCreatePaymentDialogOpen } = useContext(DialogContext);

 const dispatch = useDispatch();

 const sendId = (id) => {
  setShouldCreatePaymentDialogOpen(true);
  dispatch(listAllOrderWithID(id));
 };

 return (
  <>
   <TableRow hover key={customer.username}>
    {/* <TableCell>{customer.dateCom}</TableCell> */}
    <TableCell>{customer.name}</TableCell>
    <TableCell>{customer.phoneNumber}</TableCell>
    <TableCell>{customer.email}</TableCell>
    <TableCell>{customer.address}</TableCell>
    <TableCell>{customer.manufacturer}</TableCell>
    <TableCell>{customer.licensePlate}</TableCell>
    <TableCell>
     <ButtonAction
      variant="contained"
      color="primary"
      onClick={() => sendId(customer.id)}
     >
      <Payments fontSize="small" color="primary" />
     </ButtonAction>
    </TableCell>
   </TableRow>
  </>
 );
}
