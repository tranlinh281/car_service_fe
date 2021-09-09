import {
 Box,
 Card,
 CardContent,
 CardHeader,
 Container
} from '@material-ui/core';
import moment from 'moment';
import React, { useEffect } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { listEmployeeAbsent } from 'src/actions/userAction';
import AccessoryDialogHOC from 'src/components/_HOCProvider/AccessoryDialogHOC';
import * as constant from '../utils/Constants';

const localizer = momentLocalizer(moment);
let allViews = Object.keys(Views).map((k) => Views[k]);

const CalenderOfEmployee = () => {
 const { data, error, loading } = useSelector(
  (state) => state.employeeAbsentList
 );
 const dispatch = useDispatch();
 console.log(data, 'debug calender');
 useEffect(() => {
  dispatch(listEmployeeAbsent());
 }, [dispatch]);
 const date1 = new Date();
 date1.setHours(7);

 const date2 = new Date();
 date2.setHours(10);

 const date3 = new Date();
 date3.setDate(1);
 const date4 = new Date();
 date4.setDate(1);
 date4.setHours(5);

 const note = 'Sick as fuck';

 const objectFromBe = {
  date: new Date(),
  employees: [
   {
    empEmail: '',
    name: '',
    status: 'accepted | pending',
    startTime: '',
    endTime: ''
   }
  ]
 };

 const events = [
  {
   id: 0,
   title: `
   Phan Thong Thanh
   Reason: ${note}
   `,
   allDay: true,
   start: date1,
   end: date2
  },
  {
   id: 0,
   title: `
   Phan thong thinh
   Reason: ${note}
   `,
   allDay: true,
   start: date1,
   end: date2
  },
  {
   id: 1,
   title: 'Nguyen Phuoc An',
   allDay: false,
   start: date3,
   end: date4
  }
 ];

 return (
  <AccessoryDialogHOC>
   <Helmet>
    <title>{constant.CALENDER_TITLE}</title>
   </Helmet>
   <Box
    sx={{
     minHeight: '100%',
     py: 3
    }}
   >
    <Container maxWidth={false}>
     <Card>
      <CardHeader title="nhung nguoi nghi" />

      <CardContent>
       <Calendar
        events={events}
        showMultiDayTimes
        localizer={localizer}
        views={['week', 'agenda']}
        defaultView={'week'}
       />
      </CardContent>
     </Card>
    </Container>
   </Box>
  </AccessoryDialogHOC>
 );
};

export default CalenderOfEmployee;
