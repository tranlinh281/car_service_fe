import {
 Box,
 Button,
 Card,
 CardContent,
 CardHeader,
 Divider,
 MenuItem,
 Select
} from '@material-ui/core';
import moment from 'moment';
import React from 'react';
import { Line } from 'react-chartjs-2';

const dateTimes = moment(new Date()).format('dddd');
const dateMinus1 = moment(new Date()).subtract(1, 'day').format('dddd');
const dateMinus2 = moment(new Date()).subtract(2, 'day').format('dddd');
const dateMinus3 = moment(new Date()).subtract(3, 'day').format('dddd');
const dateMinus4 = moment(new Date()).subtract(4, 'day').format('dddd');
const dateMinus5 = moment(new Date()).subtract(5, 'day').format('dddd');
const dateMinus6 = moment(new Date()).subtract(6, 'day').format('dddd');
const BarChartDashBoard = (props) => {
 const data = {
  labels: [
   dateMinus6,
   dateMinus5,
   dateMinus4,
   dateMinus3,
   dateMinus2,
   dateMinus1,
   dateTimes
  ],
  datasets: [
   {
    label: '# of Votes',
    data: [12, 19, 3, 5, 2, 3, 23],
    fill: false,
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgba(255, 99, 132, 0.2)',
    yAxisID: 'y-axis-1'
   },
   {
    label: '# of No Votes',
    data: [1, 2, 1, 1, 2, 2, 10],
    fill: false,
    backgroundColor: 'rgb(54, 162, 235)',
    borderColor: 'rgba(54, 162, 235, 0.2)',
    yAxisID: 'y-axis-2'
   }
  ]
 };

 const options = {
  scales: {
   yAxes: [
    {
     type: 'linear',
     display: true,
     position: 'left',
     id: 'y-axis-1'
    },
    {
     type: 'linear',
     display: true,
     position: 'right',
     id: 'y-axis-2',
     gridLines: {
      drawOnArea: false
     }
    }
   ]
  }
 };
 const [dateTime, setDateTime] = React.useState('');
 const handleChange = (event) => {
  setDateTime(event.target.value);
 };

 return (
  <>
   <Card {...props}>
    <CardHeader
     action={
      <Select
       labelId="demo-simple-select-label"
       id="demo-simple-select"
       value={dateTime}
       onChange={handleChange}
      >
       <MenuItem value="date">Ngày</MenuItem>
       <MenuItem value="week">Tuần</MenuItem>
       <MenuItem value="month">Tháng</MenuItem>
      </Select>
     }
     title="Doanh thu"
    />
    <Divider />
    <CardContent>
     <Box
      sx={{
       height: 400,
       position: 'relative'
      }}
     >
      {(dateTime === 'date' || dateTime === '') && (
       <Line data={data} options={options} />
      )}
     </Box>
    </CardContent>
    <Divider />
   </Card>
  </>
 );
};

export default BarChartDashBoard;
