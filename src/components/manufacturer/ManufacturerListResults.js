import PerfectScrollbar from 'react-perfect-scrollbar';
import {
 Box,
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableRow
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../LoadingBox';

export default function ManufacturerListResults({ loading, manufacturers }) {
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
         <TableCell>Tên</TableCell>
         <TableCell>Chỉnh sửa</TableCell>
        </TableRow>
       </TableHead>

       <TableBody>
        {manufacturers?.map((manufacturer) => (
         <TableRow hover key={manufacturer.name}>
          <TableCell>{manufacturer.name}</TableCell>
          <TableCell>{manufacturer.vehicleModels}</TableCell>
         </TableRow>
        ))}
       </TableBody>
      </Table>
     </Box>
    </PerfectScrollbar>
   )}
  </>
 );
}
