import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import { DriveEta } from '@material-ui/icons';
// import * as constant from '../../utils/Constants';
import PropTypes from 'prop-types';

const TotalProfit = ({
  title,
  number,
  colorCar,
  colorBack,
  icon,
  ...rest
}) => (
  <Card {...rest}>
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="h6"
          >
            {title}
          </Typography>
          <Typography
            color="textPrimary"
            variant="h3"
          >
            {number}
          </Typography>
        </Grid>
        <Grid item >
          <Avatar
          color="blue"
            sx={{
              backgroundColor: colorBack,
              height: 56,
              width: 56
            }}
          >
            <DriveEta />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

TotalProfit.propTypes = {
  number: PropTypes.number,
  icon: PropTypes.elementType,
  title: PropTypes.string
};

export default TotalProfit;
