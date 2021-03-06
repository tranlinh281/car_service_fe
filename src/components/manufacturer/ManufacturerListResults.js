import PerfectScrollbar from 'react-perfect-scrollbar';
import {
 Box,
 Grid,
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableRow
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import LoadingTable from '../LoadingTable';
import ManufacturerCard from './ManufacturerCard';
import {
 CREATE_MANUFACTURER_SUCCESS,
 CREATE_MODEL_SUCCESS,
 EDIT_MANUFACTURER_SUCCESS
} from 'src/constants/ManufacturerConstant';
import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { triggerReload } from 'src/actions/userAction';
import { DialogContext } from 'src/contexts/dialogContexts/DialogUpdateAccessoryContextProvider';
import * as constant from 'src/utils/Constants';

export default function ManufacturerListResults({ loading, manufacturers }) {
 const { success: createSuccess } = useSelector(
  (state) => state.createManufacture
 );
 const { success: createModelSuccess } = useSelector(
  (state) => state.createModel
 );
 const { success: editManufacturer } = useSelector(
  (state) => state.editManufacturer
 );
 const { setShouldUpdateManufacturerDialogOpen } = useContext(DialogContext);
 const dispatch = useDispatch();
 useEffect(() => {
  if (createSuccess) {
   // Should create action creator for this
   dispatch({ type: CREATE_MANUFACTURER_SUCCESS, payload: false });
   dispatch(triggerReload({}));
  }
  if (createModelSuccess) {
   // Should create action creator for this
   dispatch({ type: CREATE_MODEL_SUCCESS, payload: false });
   dispatch(triggerReload({}));
  }
  if (editManufacturer) {
   // Should create action creator for this
   dispatch({ type: EDIT_MANUFACTURER_SUCCESS, payload: false });
   dispatch(triggerReload({}));
  }
 }, [createSuccess, createModelSuccess, editManufacturer]);
 return (
  <>
   {loading ? (
    <LoadingTable></LoadingTable>
   ) : (
    <PerfectScrollbar>
     <Box sx={{ pt: 3 }}></Box>
     <Grid container spacing={3}>
      {manufacturers?.map((manufacturer) => (
       <Grid item lg={4} md={6} xs={12}>
        <ManufacturerCard key={manufacturer.id} manufacturer={manufacturer} />
       </Grid>
      ))}
     </Grid>
    </PerfectScrollbar>
   )}
  </>
 );
}
