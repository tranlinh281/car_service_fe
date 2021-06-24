import PerfectScrollbar from 'react-perfect-scrollbar';
import {
 Box,
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableRow
} from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Close, EditOutlined } from '@material-ui/icons';
import ButtonAction from '../ButtonAction';
import { useEffect, useState } from 'react';
import Popup from '../Popup';
import ConfirmDialog from '../dialog/dialogConfirm';
import { useDispatch, useSelector } from 'react-redux';
import { triggerReload } from 'src/actions/userAction';
// import EditEmployeeDialog from './EditEmployeeDialog';
import { serviceHeader } from 'src/services/HeaderTitleTable';
import { Skeleton } from '@material-ui/lab';
import EditServiceDialog from './EditServiceDialog';
import { deleteService } from 'src/actions/serviceAction';

export default function ServiceListResults({ services }) {
 toast.configure({
  autoClose: 2000,
  draggable: false,
  position: toast.POSITION.BOTTOM_RIGHT
 });
 const notify = () => toast('Xóa Thành công!');

 const serviceDelete = useSelector((state) => state.serviceDelete);
 const { success } = serviceDelete;

 const [openPopup, setOpenPopup] = useState(false);
 const [confirmDialog, setConfirmDialog] = useState({
  isOpen: false,
  title: '',
  subTitle: ''
 });

 const deleteHandler = (service) => {
  dispatch(deleteService(service.id));
 };

 const dispatch = useDispatch();

 useEffect(() => {
    if (success) {
     dispatch(triggerReload({}));
     notify(true);
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
        {serviceHeader.map((headCell) => (
         <TableCell key={headCell.id}>{headCell.title}</TableCell>
        ))}
       </TableRow>
      </TableHead>

      <TableBody>
       {services?.map((service) => (
        <TableRow hover key={service.name}>
         <TableCell>{service.name}</TableCell>
         <TableCell>{service.price}</TableCell>
         <TableCell>{service.type}</TableCell>
         {/* <TableCell>{employee.status}</TableCell> */}
         {/* <TableCell>{employee.maLoaiNguoiDung}</TableCell> */}
         <TableCell>
          <EditServiceDialog dataFromParent={service} />
          <ButtonAction
           color="secondary"
           onClick={() => {
            setConfirmDialog({
             isOpen: true,
             title: 'Bạn có chắc muốn xóa?',
             onConfirm: () => {
              deleteHandler(service), setConfirmDialog({ isOpen: false });
             }
            });
           }}
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
   <ConfirmDialog
    confirmDialog={confirmDialog}
    setConfirmDialog={setConfirmDialog}
   />
  </>
 );
}
