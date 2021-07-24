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

export default function ManufacturerListToolbar({ setPage, setKeySearch }) {
 const {
  setShouldCreateManufacturerDialogOpen,
  setShouldCreateModelDialogOpen
 } = useContext(DialogContext);
 const handleOpenCreateDialog = () => {
  setShouldCreateManufacturerDialogOpen(true);
 };
 const handleOpenCreateModelDialog = () => {
  setShouldCreateModelDialogOpen(true);
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
     Thêm hãng xe
    </Button>
    <Button
     variant="contained"
     color="primary"
     onClick={handleOpenCreateModelDialog}
     sx={{ margin: '0 5px' }}
    >
     Thêm loại xe
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
        placeholder="Tìm kiếm Hãng xe"
        variant="outlined"
       />
      </Box>
     </CardContent>
    </Card>
   </Box>
  </Box>
 );
}
