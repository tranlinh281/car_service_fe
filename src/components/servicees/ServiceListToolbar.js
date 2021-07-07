import {
    Box,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon,
    Button
} from '@material-ui/core';
import { useContext } from 'react';
import { Search as SearchIcon } from 'react-feather';
import { DialogContext } from 'src/contexts/dialogContexts/DialogUpdateAccessoryContextProvider';
import CreateServiceTypeDialog from './CreateServiceTypeDialog';

export default function ServiceListToolbar({ setPage, setKeySearch }) {
    const { setShouldCreateServiceDialogOpen } = useContext(DialogContext);
    const handleOpenCreateDialog = () => {
        setShouldCreateServiceDialogOpen(true);
    };
    return (
        <Box>
          <Box sx={{display: 'flex', justifyContent:'flex-end'}}>
                <Button variant="contained" color="primary" onClick={handleOpenCreateDialog} sx={{margin: '0 5px'}}>
                    Thêm Dịch vụ
                </Button>
                <CreateServiceTypeDialog/>
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
