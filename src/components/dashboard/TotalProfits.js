import { Avatar, Card, CardContent, Grid, Typography } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
// import * as constant from '../../utils/Constants';
import PropTypes from 'prop-types';
const numberFormat = (value) =>
 new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(
  value
 );

const TotalProfits = ({
 title,
 number,
 colorCar,
 colorBack,
 icon,
 ...rest
}) => (
 <Card {...rest}>
  <CardContent sx={{ backgroundColor: '#5664d2' }}>
   <Grid
    container
    spacing={3}
    sx={{ justifyContent: 'space-between', height: 114 }}
   >
    <Grid item>
     <Typography color="white" gutterBottom variant="h6">
      {title}
     </Typography>
     <Typography color="white" variant="h3">
      {numberFormat(number)}
     </Typography>
    </Grid>
    <Grid item>
     <Avatar
      color="blue"
      sx={{
       backgroundColor: 'white',
       height: 56,
       width: 56
      }}
     >
      <AttachMoneyIcon sx={{ color: 'blue' }} />
     </Avatar>
    </Grid>
   </Grid>
  </CardContent>
 </Card>
);

TotalProfits.propTypes = {
 number: PropTypes.number,
 icon: PropTypes.elementType,
 title: PropTypes.string
};

export default TotalProfits;
