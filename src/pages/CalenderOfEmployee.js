import {
 Box,
 Card,
 CardContent,
 CardHeader,
 Container
} from '@material-ui/core';
import { Check, Close } from '@material-ui/icons';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import {
 listEmployeeAbsent,
 updateAbsenceEmployee
} from 'src/actions/userAction';
import ButtonAction from 'src/components/ButtonAction';
import ConfirmDialog from 'src/components/dialog/dialogConfirm';
import AccessoryDialogHOC from 'src/components/_HOCProvider/AccessoryDialogHOC';
import * as constant from '../utils/Constants';

const localizer = momentLocalizer(moment);
let allViews = Object.keys(Views).map((k) => Views[k]);

const ComponentTezt = ({ ...props }) => {
 const dispatch = useDispatch();
 const [confirmDialog, setConfirmDialog] = useState({
  isOpen: false,
  title: '',
  subTitle: ''
 });
 const acceptAbsentEmployee = (events, isApproved) => {
  const id = events.event.id;
  const dataNew = {
   id,
   isApproved
  };
  dispatch(updateAbsenceEmployee(dataNew));
 };
 const dennyAbsentEmployee = (events, isApprove) => {
  const id = events.event.id;
  const dataNew = {
   id,
   isApproved
  };
  dispatch(updateAbsenceEmployee(dataNew));
 };
 const approved = props.event.isApproved;

 return (
  <>
   <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
    {props.title}, {props.event.noteEmp}
   </Box>{' '}
   <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
    {approved === null ? (
     <Box>
      <ButtonAction
       color="secondary"
       onClick={() => {
        setConfirmDialog({
         isOpen: true,
         title: 'Bạn có chắc muốn duyệt ngày nghỉ này?',
         onConfirm: () => {
          acceptAbsentEmployee(props, true),
           setConfirmDialog({ isOpen: false });
         }
        });
       }}
      >
       <Check fontSize="small" color="primary" />
      </ButtonAction>
      <ButtonAction
       color="secondary"
       onClick={() => {
        setConfirmDialog({
         isOpen: true,
         title: 'Bạn có chắc muốn từ chối ngày nghỉ của nhân viên?',
         onConfirm: () => {
          dennyAbsentEmployee(props, false),
           setConfirmDialog({ isOpen: false });
         }
        });
       }}
      >
       <Close fontSize="small" color="secondary" />
      </ButtonAction>
     </Box>
    ) : (
     <div>Đã duyệt</div>
    )}{' '}
   </Box>
   <ConfirmDialog
    confirmDialog={confirmDialog}
    setConfirmDialog={setConfirmDialog}
   />
  </>
 );
};

const CalenderOfEmployee = () => {
 const { data, error, loading } = useSelector(
  (state) => state.employeeAbsentList
 );
 const dispatch = useDispatch();
 const dataItem = data.itemsList;
 console.log(dataItem, 'debug itemslist');

 let eventList = [];

 if (dataItem && dataItem.length) {
  dataItem.map((item) => {
   const absentListOfUser = item.absences.map(
    ({ timeEnd, timeStart, id, isApproved, noteEmp }) => ({
     id,
     title: item.fullname,
     start: new Date(timeStart),
     end: new Date(timeEnd),
     noteEmp,
     isApproved,
     allDay: true,
     status: 'asdhjkasdjkahsd'
    })
   );

   eventList = [...eventList, ...absentListOfUser];
  });
 }

 console.log('debug', eventList);

 useEffect(() => {
  dispatch(listEmployeeAbsent());
 }, [dispatch]);

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
      <CardHeader title="Lịch nghỉ của nhân viên" />
      <CardContent>
       <Calendar
        components={{
         agenda: {
          event: ComponentTezt
         }
        }}
        events={eventList}
        showMultiDayTimes={false}
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
