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
  const dispatch = useDispatch();

  console.log(keySearch, 'keysearch');
  
  useEffect(() => {
    dispatch(listEmployee(keySearch, currentPage));
  }, [dispatch, keySearch]);

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
                name="keyEmp"
                onChange={(e) => setKeySearch(e.target.value)}
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
