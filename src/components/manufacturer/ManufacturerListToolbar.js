import {
 Box,
 Card,
 CardContent,
 TextField,
 InputAdornment,
 Button,
 SvgIcon
} from '@material-ui/core';
import { useContext } from 'react';
import { Search as SearchIcon } from 'react-feather';
import { DialogContext } from 'src/contexts/dialogContexts/DialogUpdateAccessoryContextProvider';
import * as constant from 'src/utils/Constants';

export default function ManufacturerListToolbar({ setPage, setKeySearch }) {
 const {
  setShouldCreateManufacturerDialogOpen,
  setShouldCreateModelDialogOpen
 } = useContext(DialogContext);
 const handleOpenCreateDialog = () => {
  setShouldCreateManufacturerDialogOpen(true);
 };

 return (
  <Box>
   <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
    <Button
     variant="contained"
     color="primary"
     onClick={handleOpenCreateDialog}
     sx={{ margin: '0 5px' }}
    >
     {constant.TITLE_ADD_MANUFACTURER}
    </Button>
   </Box>

   <Box sx={{ mt: 3 }}>
    <Card>
     <CardContent>
      <Box sx={{ maxWidth: 500 }}>
       <TextField
        fullWidth
        InputProps={{
         startAdornment: (
          <InputAdornment position="start">
           <SvgIcon fontSize="small" color="action">
            <SearchIcon />
           </SvgIcon>
          </InputAdornment>
         )
        }}
        name="keySearch"
        onChange={(e) => {
         setKeySearch(e.target.value);
        }}
        placeholder={constant.TITLE_SEARCHING_MANUFACTURER}
        variant="outlined"
       />
      </Box>
     </CardContent>
    </Card>
   </Box>
  </Box>
 );
}
