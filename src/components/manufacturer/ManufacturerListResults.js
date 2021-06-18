import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@material-ui/core';
import Popup from '../Popup';
import { useDispatch, useSelector } from 'react-redux';
i

export default function ManufacturerListResults({ manufacturers }) {

    return (
        <>
            <PerfectScrollbar>
                <Box sx={{ minWidth: 1050 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Tên</TableCell>
                                <TableCell>Chỉnh sửa</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {manufacturers?.map((manufacturer) => (
                                <TableRow hover key={manufacturer}>
                                    <TableCell>{manufacturer}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
            {/* <Popup
                title="Thông tin nhân viên"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            ></Popup> */}
        </>
    );
}
