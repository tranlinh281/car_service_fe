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
import ManufacturerCard from './ManufacturerCard';
import { CREATE_MANUFACTURER_SUCCESS } from 'src/constants/ManufacturerConstant';
import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { triggerReload } from 'src/actions/userAction';
import { DialogContext } from 'src/contexts/dialogContexts/DialogUpdateAccessoryContextProvider';

export default function ManufacturerListResults({ loading, manufacturers }) {
 const { success: createSuccess } = useSelector(
  (state) => state.createManufacture
 );
 const { setShouldCreateManufacturerDialogOpen } = useContext(DialogContext);
 const dispatch = useDispatch();
 useEffect(() => {
  if (createSuccess) {
   toast.success('Thêm mới thành công!');
   // Should create action creator for this
   dispatch({ type: CREATE_MANUFACTURER_SUCCESS, payload: false });
   dispatch(triggerReload({}));

   setShouldCreateManufacturerDialogOpen(false);
  }
 }, [createSuccess]);
 return (
  <>
   {loading ? (
    <LoadingBox></LoadingBox>
   ) : (
    <PerfectScrollbar>
     <Box
      sx={{
       minWidth: 1050,
       justifyContent: 'space-between',
       flexWrap: 'wrap',
       alignContent: 'center'
      }}
     >
      {manufacturers?.map((manufacturer) => (
       <ManufacturerCard
        key={manufacturer.id}
        manufacturer={manufacturer}
       ></ManufacturerCard>
      ))}

      {/* <Table>
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
      </Table> */}
     </Box>
    </PerfectScrollbar>
   )}
  </>
 );
}
