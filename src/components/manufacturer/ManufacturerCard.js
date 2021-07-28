import {
    Card,
    CardContent,
    Typography,
    Avatar,
    Box,
    Divider,
    Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { memo } from 'react';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/GetApp';
import { manufacturerHeader } from 'src/services/HeaderTitleTable';

const ManufacturerCard = (props) => {
    const { manufacturer } = props;
    console.log(manufacturer);
    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
            }}
        >
            <CardContent>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        pb: 3
                    }}
                >
                    <Avatar
                        alt="Product"
                        src={manufacturer.imageUrl}
                        variant="square"
                        
                    />
                </Box>
                <Typography
                    align="center"
                    color="textPrimary"
                    gutterBottom
                    variant="h4"
                >
                    {manufacturer.name}
                </Typography>
            </CardContent>
            <Box sx={{ flexGrow: 1 }} />
            <Divider />
            <Box sx={{ p: 2 }}>
                <Grid
                    container
                    spacing={2}
                    sx={{ justifyContent: 'space-between' }}
                >
                    {manufacturer.vehicleModels.map(function (model, i) {
                        return <Typography
                            color="textSecondary"
                            display="inline"
                            sx={{ pl: 1 }}
                            variant="body2"
                            key={i}
                        >
                            {model.name}
                        </Typography>
                    })}
                </Grid>
            </Box>
        </Card>

    );
};
export default memo(ManufacturerCard);
