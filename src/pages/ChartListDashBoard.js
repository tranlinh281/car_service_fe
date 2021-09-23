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
    label: constant.TITLE_REVENUE_DATE,
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
    label: constant.TITLE_REVENUE_MONTH,
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
    {dateTime === constant.TITLE_ORDER_DATE_WITH || dateTime === '' ? (
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
         <MenuItem value={constant.TITLE_ORDER_DATE_WITH}>
          {constant.TITLE_DATE}
         </MenuItem>
         <MenuItem value={constant.TITLE_REVENUE_MONTH_WITH_VALUE}>
          {constant.TITLE_MONTN}
         </MenuItem>
        </Select>
       }
       title={constant.TITLE_REVENUE_LATE_7_DAY}
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
        <MenuItem value="date">{constant.TITLE_DATE}</MenuItem>
        <MenuItem value="month">{constant.TITLE_MONTN}</MenuItem>
       </Select>
      }
      title={constant.TITLE_REVENUE_MONTH_WITH}
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
      {dateTime === constant.TITLE_ORDER_DATE_WITH || dateTime === '' ? (
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
