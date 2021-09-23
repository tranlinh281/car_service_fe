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

export default function PackageListToolbar({ setPage, setKeySearch }) {
 const { setShouldCreatePackageDialogOpen } = useContext(DialogContext);
 const handleOpenCreateDialog = () => {
  setShouldCreatePackageDialogOpen(true);
 };
 return (
  <Box>
   <Box
    sx={{
     display: 'flex',
     justifyContent: 'flex-end'
    }}
   >
    <Button
     variant="contained"
     color="primary"
     onClick={handleOpenCreateDialog}
    >
     {constant.TITLE_ADD_PACKAGE}
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
        placeholder={constant.TITLE_SEARCHING_PACKAGE}
        variant="outlined"
       />
      </Box>
     </CardContent>
    </Card>
   </Box>
  </Box>
 );
}
