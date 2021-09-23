import {
    Box,
    Card,
    CardContent, Divider
} from '@material-ui/core';
import React from 'react';
import { Line } from 'react-chartjs-2';
import * as constant from '../utils/objectLineChart';

const ChartListDashBoard = (props) => {
 const [dateTime, setDateTime] = React.useState('');
 const handleChange = (event) => {
  setDateTime(event.target.value);
 };

 return (
  <>
   <Card {...props}>
    <Divider />
    <CardContent>
     <Box
      sx={{
       height: 400,
       position: 'relative'
      }}
     >
      {dateTime === 'date' || dateTime === '' ? (
       <Line data={constant.dataDate} options={constant.options} />
      ) : (
       <Line data={constant.dataMonth} options={constant.options} />
      )}
     </Box>
    </CardContent>
    <Divider />
   </Card>
  </>
 );
};

export default ChartListDashBoard;
