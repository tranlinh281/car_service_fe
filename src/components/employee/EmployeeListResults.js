import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import ButtonAction from '../ButtonAction';
import { useEffect, useState } from 'react';
import Popup from '../Popup';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEmployee, triggerReload } from 'src/actions/userAction';
import EditEmployeeDialog from './EditEmployeeDialog';
import { employeeHeader } from 'src/services/HeaderTitleTable';
import * as errorEmp from '../../utils/Constants'

export default function EmployeeListResult({ loading, employees }) {
    const [openPopup, setOpenPopup] = useState(false);

    const employeeDelete = useSelector((state) => state.employeeDelete);
    const { success } = employeeDelete;

    const dispatch = useDispatch();

    const deleteHandler = (employee) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteEmployee(employee.username));
        }
    };

    useEffect(() => {
        if (success) {
            dispatch(triggerReload({}));
        }
    }, [success]);

    const test = (customer) => { };

    const openInPopup = (customer) => {
        setOpenPopup(true);
    };

    const showRole = (value) => {
        if (value == 'staff') {
            return 'Kỹ thuật viên';
        } else return 'Quản lý';
    };

    return (
        <>
            {loading ?
                <p style={{ textAlign: 'center', fontSize: '1.3rem', fontWeight: 'bold' }}>{errorEmp.NOT_EXITS_EMP}</p>
                :
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
                                {employees?.map((employee) => (
                                    <TableRow hover key={employee.username}>
                                        <TableCell>{employee.username}</TableCell>
                                        <TableCell>{employee.fullname}</TableCell>
                                        <TableCell>{employee.phoneNumber}</TableCell>
                                        <TableCell>{showRole(employee.role)}</TableCell>
                                        <TableCell>
                                            <EditEmployeeDialog dataFromParent={employee} />
                                            <ButtonAction color="secondary" onClick={() => deleteHandler(employee)}>
                                                <Close fontSize="small" />
                                            </ButtonAction>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>

                        </Table>
                    </Box>
                </PerfectScrollbar>
            }

            <Popup
                title="Thông tin nhân viên"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            ></Popup>
        </>
    );
}
