import {
 Box,
 Card,
 CardContent,
 CardHeader,
 Divider,
 MenuItem,
 Select
} from '@material-ui/core';
import React from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import * as constant from '../utils/objectLineChart';

const rand = () => Math.floor(Math.random() * 255);
const ChartListDashBoard = (props) => {
 const [dateTime, setDateTime] = React.useState('');

 const { data } = useSelector((state) => state.transactionAllList);

 const handleChange = (event) => {
  setDateTime(event.target.value);
 };
 const dataDate = {
  labels: constant.arrDate,
  datasets: [
   {
    label: 'Doanh thu ngày',
    data: data.lineChartDate,
    fill: false,
    borderColor: `rgb(${rand()}, ${rand()}, ${rand()})`,
    backgroundColor: `rgb(${rand()}, ${rand()}, ${rand()})`,
    yAxisID: 'y-axis-1'
   }
  ]
 };
 const dataMonth = {
  labels: constant.arrMonth,
  datasets: [
   {
    label: 'Doanh thu tháng',
    data: data.lineChartMonth,
    fill: false,
    borderColor: `rgb(${rand()}, ${rand()}, ${rand()})`,
    backgroundColor: `rgb(${rand()}, ${rand()}, ${rand()})`,
    yAxisID: 'y-axis-1'
   }
  ]
 };
 return (
  <>
   <Card {...props}>
    {dateTime === 'date' || dateTime === '' ? (
     <>
      {' '}
      <CardHeader
       action={
        <Select
         labelId="demo-simple-select-label"
         id="demo-simple-select"
         value={dateTime}
         onChange={handleChange}
        >
         <MenuItem value="date">Ngày</MenuItem>
         <MenuItem value="month">Tháng</MenuItem>
        </Select>
       }
       title="Thống kê doanh thu 7 ngày gần đây"
      />
     </>
    ) : (
     <CardHeader
      action={
       <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={dateTime}
        onChange={handleChange}
       >
        <MenuItem value="date">Ngày</MenuItem>
        <MenuItem value="month">Tháng</MenuItem>
       </Select>
      }
      title="Thống kê doanh thu tháng"
     />
    )}

    <Divider />
    <CardContent>
     <Box
      sx={{
       height: 400,
       position: 'relative'
      }}
     >
      {dateTime === 'date' || dateTime === '' ? (
       <>
        <Line data={dataDate} options={constant.options} />
       </>
      ) : (
       <Line data={dataMonth} options={constant.options} />
      )}
     </Box>
    </CardContent>
    <Divider />
   </Card>
  </>
 );
};

export default ChartListDashBoard;
