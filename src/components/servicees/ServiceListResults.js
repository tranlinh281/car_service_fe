import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@material-ui/core';
import { Close, Edit } from '@material-ui/icons';
import { useContext, useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteService } from 'src/actions/serviceAction';
import { triggerReload } from 'src/actions/userAction';
import {
    CREATE_SERVICE_SUCCESS,
    DELETE_SERVICE_SUCCESS,
    EDIT_SERVICE_SUCCESS
} from 'src/constants/serviceConstant';
import { DialogContext } from 'src/contexts/dialogContexts/DialogUpdateAccessoryContextProvider';
// import EditEmployeeDialog from './EditEmployeeDialog';
import { serviceHeader } from 'src/services/HeaderTitleTable';
import ButtonAction from '../ButtonAction';
import ConfirmDialog from '../dialog/dialogConfirm';

export default function ServiceListResults({ services }) {
 const serviceDelete = useSelector((state) => state.serviceDelete);
 const { success } = serviceDelete;

 const [openPopup, setOpenPopup] = useState(false);
 const [confirmDialog, setConfirmDialog] = useState({
  isOpen: false,
  title: '',
  subTitle: ''
 });
 const { success: deleteSuccess } = useSelector((state) => state.serviceDelete);
 const { success: updateSuccess } = useSelector((state) => state.editService);
 const { success: createSuccess } = useSelector(
  (state) => state.createServices
 );

 const deleteHandler = (service) => {
  dispatch(deleteService(service.id));
 };

 const dispatch = useDispatch();

 const {
  setShouldUpdateServiceDialogOpen,
  setUpdateServiceDefaultValue,
  setShouldCreateServiceDialogOpen
 } = useContext(DialogContext);

 useEffect(() => {
  if (deleteSuccess) {
   toast.success('Xóa thành công!');
   // Should create action creator for this
   dispatch({ type: DELETE_SERVICE_SUCCESS, payload: false });
   dispatch(triggerReload({}));
  }

  if (updateSuccess) {
   toast.success('Cập nhật thành công!');
   // Should create action creator for this
   dispatch({ type: EDIT_SERVICE_SUCCESS, payload: false });
   dispatch(triggerReload({}));

   setShouldUpdateServiceDialogOpen(false);
  }

  if (createSuccess) {
   toast.success('Thêm mới thành công!');
   // Should create action creator for this
   dispatch({ type: CREATE_SERVICE_SUCCESS, payload: false });
   dispatch(triggerReload({}));
   setShouldCreateServiceDialogOpen(false);
  }
 }, [deleteSuccess, updateSuccess, createSuccess]);
 const handleOpenEditDialog = (editData) => {
  setShouldUpdateServiceDialogOpen(true);
  setUpdateServiceDefaultValue(editData);
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
          <ButtonAction
           variant="contained"
           color="primary"
           onClick={() => handleOpenEditDialog(service)}
          >
           <Edit fontSize="small" />
          </ButtonAction>
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
   <ConfirmDialog
    confirmDialog={confirmDialog}
    setConfirmDialog={setConfirmDialog}
   />
  </>
 );
}
