import {
 Box,
 Button,
 Card,
 CardContent,
 TextField,
 InputAdornment,
 SvgIcon
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Search as SearchIcon } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { listEmployee } from 'src/actions/userAction';

export default function EmployeeListToolbar(props) {
 const employeeList = useSelector((state) => state.employeeList);
 const { loading, error, currentPage } = employeeList;
 const [keySearch, setKeySearch] = useState('');
 const [page, setPage] = useState(currentPage);
 const dispatch = useDispatch();

 console.log(keySearch, 'keySearch');

 useEffect(() => {
  dispatch(listEmployee(keySearch, page));
 }, [dispatch, keySearch,page]);
 console.log(page,"toolbar");

 return (
  <Box {...props}>
   <Box
    sx={{
     display: 'flex',
     justifyContent: 'flex-end'
    }}
   >
    <Button>Import</Button>
    <Button sx={{ mx: 1 }}>Export</Button>
    <Button color="primary" variant="contained">
     Add employee
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
         setPage(1)
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
