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
import LoadingBox from '../LoadingBox';
import ManufacturerCard from './ManufacturerCard';
import {
 CREATE_MANUFACTURER_SUCCESS,
 CREATE_MODEL_SUCCESS
} from 'src/constants/ManufacturerConstant';
import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { triggerReload } from 'src/actions/userAction';
import { DialogContext } from 'src/contexts/dialogContexts/DialogUpdateAccessoryContextProvider';

export default function ManufacturerListResults({ loading, manufacturers }) {
 const { success: createSuccess } = useSelector(
  (state) => state.createManufacture
 );
 const { success: createModelSuccess } = useSelector(
  (state) => state.createModel
 );
 const {
  setShouldCreateModelDialogOpen,
  setShouldCreateManufacturerDialogOpen
 } = useContext(DialogContext);
 const dispatch = useDispatch();
 useEffect(() => {
  if (createSuccess) {
   toast.success('Thêm mới thành công!');
   // Should create action creator for this
   dispatch({ type: CREATE_MANUFACTURER_SUCCESS, payload: false });
   dispatch(triggerReload({}));

   setShouldCreateManufacturerDialogOpen(false);
  }
  if (createModelSuccess) {
   toast.success('Thêm mới thành công!');
   // Should create action creator for this
   dispatch({ type: CREATE_MODEL_SUCCESS, payload: false });
   dispatch(triggerReload({}));

   setShouldCreateModelDialogOpen(false);
  }
 }, [createSuccess, createModelSuccess]);
 return (
  <>
   {loading ? (
    <LoadingBox></LoadingBox>
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
