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
import DialogCreateAccessory from '../dialog/dialogCreateAccessory';
import CreateAccessoryTypeDialog from './CreateAccessoryTypeDialog';

export default function AccessoryListToolbar({ setPage, setKeySearch }) {
 const { setShouldCreateAccessoryDialogOpen } = useContext(DialogContext);
 const handleOpenCreateDialog = () => {
  setShouldCreateAccessoryDialogOpen(true);
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
     Thêm Phụ Tùng
    </Button>
    <CreateAccessoryTypeDialog />
   </Box>

   {/* <CreateEmployee/> */}
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
         setPage(1);
        }}
        placeholder="Tìm kiếm Phụ tùng"
        variant="outlined"
       />
      </Box>
     </CardContent>
    </Card>
   </Box>
  </Box>
 );
}
