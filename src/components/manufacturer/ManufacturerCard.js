import {
    Avatar,
    Box, Card,
    CardContent, Divider,
    Grid, Typography
} from '@material-ui/core';
import { Add, Edit } from '@material-ui/icons';
import { memo, useContext } from 'react';
import { DialogContext } from 'src/contexts/dialogContexts/DialogUpdateAccessoryContextProvider';
import ButtonAction from '../ButtonAction';

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
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
     <ButtonAction
      variant="contained"
      color="primary"
      onClick={() => handleOpenEditDialog(manufacturer)}
     >
      <Edit fontSize="small" color="primary" justifyContent="left" />
     </ButtonAction>
    </Box>
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
     <ButtonAction
      variant="contained"
      color="primary"
      onClick={() => handleOpenAddDialog(manufacturer)}
     >
      <Add fontSize="small" color="primary" justifyContent="left" />
     </ButtonAction>
    </Box>
    <Box
     sx={{
      display: 'flex',
      justifyContent: 'center',
      pb: 3
     }}
    >
     <Avatar
      alt="Product"
      sx={{
       width: 100,
       height: 100
      }}
      s
      src={manufacturer.imageUrl}
      variant="square"
     />
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
