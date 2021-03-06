import {
 Box,
 Card,
 CardContent,
 TextField,
 InputAdornment,
 SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import * as constant from 'src/utils/Constants';

export default function CustomerListToolbar({ setPage, setKeySearch }) {
 return (
  <Box>
   {/* <CreateEmployeeDialog/> */}
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
        placeholder={constant.TITLE_SEARCHING_CUSTOMER}
        variant="outlined"
       />
      </Box>
     </CardContent>
    </Card>
   </Box>
  </Box>
 );
}
