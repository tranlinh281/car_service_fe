import {
 Box,
 Button,
 Card,
 CardContent,
 InputAdornment,
 SvgIcon,
 TextField
} from '@material-ui/core';
import { useContext } from 'react';
import { Search as SearchIcon } from 'react-feather';
import { DialogContext } from 'src/contexts/dialogContexts/DialogUpdateAccessoryContextProvider';
import * as constant from 'src/utils/Constants';
export default function ServiceListToolbar({ setPage, setKeySearch }) {
 const { setShouldCreateServiceDialogOpen, setShouldCreateTypeDialogOpen } =
  useContext(DialogContext);
 const handleOpenCreateDialog = () => {
  setShouldCreateServiceDialogOpen(true);
 };
 const handleOpenCreateTypeDialog = () => {
  setShouldCreateTypeDialogOpen(true);
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
     {constant.TITLE_ADD_SERVICE}
    </Button>
    <Button
     variant="contained"
     color="primary"
     onClick={handleOpenCreateTypeDialog}
     sx={{ margin: '0 5px' }}
    >
     {constant.TITLE_ADD_TYPE_SERVICE}
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
         setPage(1);
        }}
        placeholder={constant.TITLE_SEARCHING_SERVICE}
        variant="outlined"
       />
      </Box>
     </CardContent>
    </Card>
   </Box>
  </Box>
 );
}
