import {
 Box,
 Card,
 CardContent,
 InputAdornment,
 SvgIcon,
 TextField
} from '@material-ui/core';
import { useCallback, useEffect, useState } from 'react';
import { Search as SearchIcon } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { listEmployee, triggerReload } from 'src/actions/userAction';
import CreateEmployee from './CreateEmployee';
export default function EmployeeListToolbar(props) {
 const employeeList = useSelector((state) => state.employeeList);
 const { loading, error, currentPage } = employeeList;
 const [keySearch, setKeySearch] = useState('');
 const [page, setPage] = useState(currentPage);
 const dispatch = useDispatch();

 useEffect(() => {
  dispatch(listEmployee(keySearch, page));
 }, [dispatch, keySearch, page]);

 const handleSearch = useCallback(
  (e) => {
   setKeySearch(e.target.value);
   dispatch(triggerReload({}));
  },
  [setKeySearch]
 );

 return (
  <Box {...props}>
   <CreateEmployee />
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
        onChange={handleSearch}
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
