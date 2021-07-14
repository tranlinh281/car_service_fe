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
import { manufacturerHeader } from 'src/services/HeaderTitleTable';

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
         {manufacturerHeader.map((headCell) => (
          <TableCell key={headCell.id}>{headCell.title}</TableCell>
         ))}
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
