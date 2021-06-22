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
import EditEmployeeDialog from './EditEmployeeDialog';
import { employeeHeader } from 'src/services/HeaderTitleTable';
import { Skeleton } from '@material-ui/lab';

export default function EmployeeListResult({ employees }) {
    const [openPopup, setOpenPopup] = useState(false);

    const employeeDelete = useSelector((state) => state.employeeDelete);
    const { success } = employeeDelete;

    const dispatch = useDispatch();

    const deleteHandler = (customer) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteEmployee(customer.taiKhoan));
            dispatch(triggerReload({}));
        }
    };

    const test = (customer) => { };

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
                                {
                                    employeeHeader.map(headCell => (
                                        <TableCell key={headCell.id} >
                                            {headCell.title}
                                        </TableCell>))
                                }
                            </TableRow>
                        </TableHead>
                        
                        <TableBody>
                            {employees?.map((employee) => (
                                <TableRow hover key={employee.username}>
                                    <TableCell>{employee.username}</TableCell>
                                    <TableCell>{employee.fullname}</TableCell>
                                    <TableCell>{employee.phoneNumber}</TableCell>
                                    {/* <TableCell>{{employee.role=="staff":"Kỹ Thuật Viên"?"Quản lý" }}</TableCell> */}
                                    {/* <TableCell>{employee.status}</TableCell> */}
                                    {/* <TableCell>{employee.maLoaiNguoiDung}</TableCell> */}
                                    <TableCell>
                                        <EditEmployeeDialog
                                            dataFromParent={employee}
                                        />
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
