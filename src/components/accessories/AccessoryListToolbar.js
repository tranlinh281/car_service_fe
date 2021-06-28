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
   <CreateAccessoryTypeDialog />
   <Button variant="contained" color="primary" onClick={handleOpenCreateDialog}>
    Thêm Phụ Tùng
   </Button>
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
        placeholder="Search employee"
        variant="outlined"
       />
      </Box>
     </CardContent>
    </Card>
   </Box>
  </Box>
 );
}
