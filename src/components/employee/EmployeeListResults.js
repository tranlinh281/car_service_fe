import {
 Box,
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableRow
} from '@material-ui/core';
import { Close, Edit } from '@material-ui/icons';
import { memo, useContext, useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteEmployee, triggerReload } from 'src/actions/userAction';
import {
 CREATE_EMPLOYEE_SUCCESS,
 DELETE_EMPLOYEE_SUCCESS,
 EDIT_EMPLOYEE_SUCCESS
} from 'src/constants/userConstant';
import { DialogContext } from 'src/contexts/dialogContexts/DialogUpdateAccessoryContextProvider';
import { employeeHeader } from 'src/services/HeaderTitleTable';
import LoadingBox from 'src/components/LoadingBox';
import ButtonAction from '../ButtonAction';
import ConfirmDialog from '../dialog/dialogConfirm';

const EmployeeListResult = ({ loading, employees, errorMessage }) => {
 const [confirmDialog, setConfirmDialog] = useState({
  isOpen: false,
  title: '',
  subTitle: ''
 });

 const { success: deleteSuccess } = useSelector(
  (state) => state.employeeDelete
 );
 const { success: updateSuccess } = useSelector((state) => state.editEmployee);

 const { success: createSuccess } = useSelector(
  (state) => state.createEmployee
 );

 const dispatch = useDispatch();
 const {
  setShouldCreateEmployeeDialogOpen,
  setShouldUpdateEmployeeDialogOpen,
  setUpdateEmployeeDefaultValue
 } = useContext(DialogContext);

 useEffect(() => {
  if (deleteSuccess) {
   toast.success('Xóa thành công!');
   // Should create action creator for this
   dispatch({ type: DELETE_EMPLOYEE_SUCCESS, payload: false });
   dispatch(triggerReload({}));
  }

  if (updateSuccess) {
   toast.success('Cập nhật thành công!');
   // Should create action creator for this
   dispatch({ type: EDIT_EMPLOYEE_SUCCESS, payload: false });
   dispatch(triggerReload({}));

   setShouldUpdateEmployeeDialogOpen(false);
  }

  if (createSuccess) {
   toast.success('Thêm mới thành công!');
   // Should create action creator for this
   dispatch({ type: CREATE_EMPLOYEE_SUCCESS, payload: false });
   dispatch(triggerReload({}));

   setShouldCreateEmployeeDialogOpen(false);
  }
  if (errorMessage) {
   const errMessage = 'Không tìm thấy nhân viên';
  }
 }, [deleteSuccess, updateSuccess, createSuccess, errorMessage]);
 const handleOpenEditDialog = (editData) => {
  setShouldUpdateEmployeeDialogOpen(true);
  setUpdateEmployeeDefaultValue(editData);
 };

 const showRole = (value) => {
  if (value == 'staff') {
   return 'Kỹ thuật viên';
  } else return 'Quản lý';
 };
 const deleteHandler = (employee) => {
  dispatch(deleteEmployee(employee.username));
 };

 return (
  <>
   {loading ? (
    <LoadingBox></LoadingBox>
   ) : (
    <PerfectScrollbar>
     <Box sx={{ minWidth: 1050 }}>
      <Table>
       <TableHead>
        <TableRow>
         {employeeHeader.map((headCell) => (
          <TableCell key={headCell.id}>{headCell.title}</TableCell>
         ))}
        </TableRow>
       </TableHead>
       <TableBody>
        {(employees?.length &&
         employees?.map((employee) => (
          <TableRow hover key={employee.username}>
           <TableCell>{employee.username}</TableCell>
           <TableCell>{employee.fullname}</TableCell>
           <TableCell>{employee.phoneNumber}</TableCell>
           <TableCell>{showRole(employee.role)}</TableCell>
           <TableCell>
            <ButtonAction
             variant="contained"
             color="primary"
             onClick={() => handleOpenEditDialog(employee)}
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
                deleteHandler(employee), setConfirmDialog({ isOpen: false });
               }
              });
             }}
            >
             <Close fontSize="small" />
            </ButtonAction>
           </TableCell>
          </TableRow>
         ))) ||
         errMessage}
       </TableBody>
      </Table>
     </Box>
    </PerfectScrollbar>
   )}
   <ConfirmDialog
    confirmDialog={confirmDialog}
    setConfirmDialog={setConfirmDialog}
   />
  </>
 );
};
export default memo(EmployeeListResult);
