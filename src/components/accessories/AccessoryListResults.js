import PerfectScrollbar from 'react-perfect-scrollbar';
import {
 Box,
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableRow
} from '@material-ui/core';
import { Close, EditOutlined } from '@material-ui/icons';
import ButtonAction from '../ButtonAction';
import { useEffect, useState } from 'react';
import Popup from '../Popup';
import ConfirmDialog from '../dialog/dialogConfirm';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEmployee, triggerReload } from 'src/actions/userAction';
// import EditEmployeeDialog from './EditEmployeeDialog';
import { accessoryHeader } from 'src/services/HeaderTitleTable';
import { Skeleton } from '@material-ui/lab';
import EditAccessoryDialog from './EditAccessoryDialog';
import { deleteAccessory } from 'src/actions/accessoryAction';

export default function AccessoryListResults({ accessories }) {
 const [openPopup, setOpenPopup] = useState(false);

 const accessoryDelete = useSelector((state) => state.accessoryDelete);
 const { success } = accessoryDelete;
 console.log('id', accessories);

 const dispatch = useDispatch();

 const deleteHandler = (accessory) => {
  if (window.confirm('Are you sure?')) {
   dispatch(deleteAccessory(accessory.id));
  }
 };
 useEffect(() => {
  if (success) {
   dispatch(triggerReload({}));
  }
 }, [success]);

 const test = (customer) => {};

 const openInPopup = (customer) => {
  setOpenPopup(true);
 };

 return (
  <>
   <PerfectScrollbar>
    <Box sx={{ minWidth: 1050 }}>
     <Table>
      <TableHead>
       <TableRow>
        {accessoryHeader.map((headCell) => (
         <TableCell key={headCell.id}>{headCell.title}</TableCell>
        ))}
       </TableRow>
      </TableHead>

      <TableBody>
       {accessories?.map((accessory) => (
        <TableRow hover key={accessory.name}>
         <TableCell>{accessory.name}</TableCell>
         <TableCell>{accessory.quantity}</TableCell>
         <TableCell>{accessory.price}</TableCell>
         <TableCell>{accessory.unit}</TableCell>
         <TableCell>{accessory.type}</TableCell>
         <TableCell>{accessory.manufacturer}</TableCell>
         {/* <TableCell>{employee.status}</TableCell> */}
         {/* <TableCell>{employee.maLoaiNguoiDung}</TableCell> */}
         <TableCell>
          <EditAccessoryDialog dataFromParent={accessory} />
          <ButtonAction
           color="secondary"
           onClick={() => deleteHandler(accessory)}
          >
           <Close fontSize="small" />
          </ButtonAction>
         </TableCell>
        </TableRow>
       ))}
      </TableBody>
     </Table>
    </Box>
   </PerfectScrollbar>
   <Popup
    title="Thông tin nhân viên"
    openPopup={openPopup}
    setOpenPopup={setOpenPopup}
   ></Popup>
  </>
 );
}
