import {
 Card,
 CardContent,
 Typography,
 Avatar,
 Box,
 Divider,
 Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { memo, useContext } from 'react';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/GetApp';
import { manufacturerHeader } from 'src/services/HeaderTitleTable';
import ButtonAction from '../ButtonAction';
import { Add, Edit } from '@material-ui/icons';
import { DialogContext } from 'src/contexts/dialogContexts/DialogUpdateAccessoryContextProvider';

const ManufacturerCard = (props) => {
 const { manufacturer } = props;

 const {
  setShouldUpdateManufacturerDialogOpen,
  setShouldCreateModelDialogOpen,
  setUpdateManufacturerDefaultValue
 } = useContext(DialogContext);
 const handleOpenAddDialog = (editData) => {
  setShouldCreateModelDialogOpen(true);
  setUpdateManufacturerDefaultValue(editData);
 };
 const handleOpenEditDialog = (editData) => {
  setShouldUpdateManufacturerDialogOpen(true);
  setUpdateManufacturerDefaultValue(editData);
 };
 return (
  <Card
   sx={{
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
   }}
  >
   <CardContent>
    <ButtonAction
     variant="contained"
     color="primary"
     onClick={() => handleOpenEditDialog(manufacturer)}
    >
     <Edit fontSize="small" color="primary" justifyContent="left" />
    </ButtonAction>
    <ButtonAction
     variant="contained"
     color="primary"
     onClick={() => handleOpenAddDialog(manufacturer.name)}
    >
     <Add fontSize="small" color="primary" justifyContent="left" />
    </ButtonAction>
    <Box
     sx={{
      display: 'flex',
      justifyContent: 'center',
      pb: 3
     }}
    >
     <Avatar alt="Product" src={manufacturer.imageUrl} variant="square" />
    </Box>
    <Typography align="center" color="textPrimary" gutterBottom variant="h4">
     {manufacturer.name}
    </Typography>
   </CardContent>
   <Box sx={{ flexGrow: 1 }} />
   <Divider />
   <Box sx={{ p: 2 }}>
    <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
     {manufacturer.vehicleModels.map(function (model, i) {
      return (
       <Typography
        color="textSecondary"
        display="inline"
        sx={{ pl: 0.5 }}
        variant="body2"
        key={i}
       >
        {model.name}
       </Typography>
      );
     })}
    </Grid>
   </Box>
  </Card>
 );
};
export default memo(ManufacturerCard);
