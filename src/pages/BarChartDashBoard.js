import { Bar } from 'react-chartjs-2';
import {
 Box,
 Button,
 Card,
 CardContent,
 CardHeader,
 Divider,
 useTheme,
 colors,
 Typography
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import React from 'react';
import { Line } from 'react-chartjs-2';

const BarChartDashBoard = (props) => {
 const data = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
   {
    label: '# of Votes',
    data: [12, 19, 3, 5, 2, 3],
    fill: false,
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgba(255, 99, 132, 0.2)',
    yAxisID: 'y-axis-1'
   },
   {
    label: '# of No Votes',
    data: [1, 2, 1, 1, 2, 2],
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
 return (
  <>
   <Card {...props}>
    <CardHeader
     action={
      <Button endIcon={<ArrowDropDownIcon />} size="small" variant="text">
       Last 7 days
      </Button>
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
      <Line data={data} options={options} />
     </Box>
    </CardContent>
    <Divider />
    <Box
     sx={{
      display: 'flex',
      justifyContent: 'flex-end',
      p: 2
     }}
    ></Box>
   </Card>
  </>
 );
};

export default BarChartDashBoard;
