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

export default function EmployeeListToolbar({ setPage, setKeySearch }) {
 const { setShouldCreateEmployeeDialogOpen } = useContext(DialogContext);
 const handleOpenCreateDialog = () => {
  setShouldCreateEmployeeDialogOpen(true);
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
     {constant.TITLE_ADD_EMPLOYEE}
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
        placeholder={constant.TITLE_SEARCHING_EMPLOYEE}
        variant="outlined"
       />
      </Box>
     </CardContent>
    </Card>
   </Box>
  </Box>
 );
}
