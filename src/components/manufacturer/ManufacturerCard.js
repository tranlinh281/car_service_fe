import {
 Card,
 CardActionArea,
 CardContent,
 CardMedia,
 Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { memo } from 'react';

const useStyles = makeStyles({
 root: {
  maxWidth: 345
 },
 media: {
  height: 140
 }
});

const ManufacturerCard = (props) => {
 const { manufacturer } = props;
 const classes = useStyles();

 return (
  <Card className={classes.root}>
   <CardActionArea>
    <CardMedia
     className={classes.media}
     image="/static/images/cards/contemplative-reptile.jpg"
     title="Contemplative Reptile"
    />
    <CardContent>
     <Typography gutterBottom variant="h5" component="h2">
      {manufacturer.name}
     </Typography>
     <Typography variant="body2" color="textSecondary" component="p">
      {manufacturer.vehicleModels}
     </Typography>
    </CardContent>
   </CardActionArea>
  </Card>
 );
};
export default memo(ManufacturerCard);
