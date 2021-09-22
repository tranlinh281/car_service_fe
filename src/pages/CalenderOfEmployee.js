import {
 Box,
 Card,
 CardContent,
 CardHeader,
 Container,
 makeStyles,
 Tooltip
} from '@material-ui/core';
import { Check, Close } from '@material-ui/icons';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
 listEmployeeAbsent,
 triggerReload,
 updateAbsenceEmployee
} from 'src/actions/userAction';
import ButtonAction from 'src/components/ButtonAction';
import ConfirmDialog from 'src/components/dialog/dialogConfirm';
import EmployeeDialogHOC from 'src/components/_HOCProvider/EmployeeDialogHOC';
import { DialogContext } from 'src/contexts/dialogContexts/DialogUpdateAccessoryContextProvider';
import * as constant from '../utils/Constants';
import './Calendar.css';

const localizer = momentLocalizer(moment);
let allViews = Object.keys(Views).map((k) => Views[k]);
const IconStyle = {
 cursor: 'pointer'
};

const useStyles = makeStyles({
 calendarContent: {
  '& > .rbc-time-view > .rbc-time-content': {
   display: 'none'
  },
  '& > .rbc-time-view > .rbc-time-header > .rbc-time-header-gutter': {
   display: 'none'
  }
 }
});

function Event({ ...props }) {
 const approved = props.event.isApproved;
 const noteAdmin = props.event.noteAdmin;
 let titelTool;
 if (noteAdmin === '' || noteAdmin === null) {
  titelTool = constant.TITLE_DENNY;
 } else {
  titelTool = constant.TITLE_DENNY_WITH_COMMENT + noteAdmin;
 }

 return (
  <>
   {approved === true ? (
    <Tooltip title={constant.TITLE_ACCEPT}>
     <span>
      <strong>{props.title}</strong>
     </span>
    </Tooltip>
   ) : approved === false ? (
    <Tooltip title={titelTool}>
     <span>
      <strong>{props.title}</strong>
     </span>
    </Tooltip>
   ) : (
    <Tooltip title={constant.TITLE_PENDING}>
     <span>
      <strong>{props.title}</strong>
     </span>
    </Tooltip>
   )}
  </>
 );
}

const EventAgenda = ({ ...props }) => {
 const dispatch = useDispatch();
 const [confirmDialog, setConfirmDialog] = useState({
  isOpen: false,
  title: '',
  subTitle: ''
 });
 const { setUpdateAbsentDefaultValue, setShouldUpdateAbsentDialogOpen } =
  useContext(DialogContext);
 const acceptAbsentEmployee = (events, isApproved) => {
  const id = events.event.id;
  const dataNew = {
   id,
   isApproved
  };
  dispatch(updateAbsenceEmployee(dataNew));
  toast.success('Đồng ý ngày nghỉ thành công!');
 };

 const handleOpenDennyAbsentDialog = (id) => {
  setShouldUpdateAbsentDialogOpen(true);
  setUpdateAbsentDefaultValue(id);
 };

 const approved = props.event.isApproved;
 const noteAd = props.event.noteAdmin;

 return (
  <>
   <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
    {props.title}
   </Box>

   <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
    <Box sx={{ marginRight: 'auto' }}>
     Lý do:<b> {props.event.noteEmp}</b>
    </Box>
    <Box>
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
           dispatch(triggerReload({}));
          }
         });
        }}
       >
        <Check fontSize="small" color="primary" />
       </ButtonAction>
       <ButtonAction
        color="secondary"
        onClick={() => handleOpenDennyAbsentDialog(props.event)}
       >
        <Close fontSize="small" color="secondary" />
       </ButtonAction>
      </Box>
     ) : approved === true ? (
      <div>Đã duyệt</div>
     ) : (
      <div>
       Lý do từ chối: <b>{noteAd}</b>
      </div>
     )}
    </Box>
   </Box>
   <ConfirmDialog
    confirmDialog={confirmDialog}
    setConfirmDialog={setConfirmDialog}
   />
  </>
 );
};

// -------------------------------------------------------------------------------------------------

const CalenderOfEmployee = () => {
 const classNames = useStyles();
 const { data, error, loading } = useSelector(
  (state) => state.employeeAbsentList
 );
 const { success: absentUpdateSuccess } = useSelector(
  (state) => state.updateAbsentEmployee
 );
 const triggerReload = useSelector((state) => state.triggerReload);

 const dispatch = useDispatch();
 const dataItem = data.itemsList;

 let eventList = [];

 if (dataItem && dataItem.length) {
  dataItem.map((item) => {
   const absentListOfUser = item.absences.map(
    ({ timeEnd, timeStart, id, isApproved, noteEmp, noteAdmin }) => ({
     id,
     title: item.fullname,
     start: new Date(timeStart),
     end: new Date(timeEnd),
     noteAdmin,
     noteEmp,
     allDay: true,
     isApproved
    })
   );

   eventList = [...eventList, ...absentListOfUser];
  });
 }

 useEffect(() => {
  dispatch(listEmployeeAbsent());
 }, [dispatch, triggerReload, absentUpdateSuccess]);

 return (
  <EmployeeDialogHOC>
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
        className={classNames.calendarContent}
        components={{
         event: Event,
         agenda: {
          event: EventAgenda
         }
        }}
        events={eventList}
        showMultiDayTimes={false}
        localizer={localizer}
        views={['week', 'agenda']}
        defaultView={'week'}
        eventPropGetter={(event) => {
         let backgroundColor = '#F7CB73';

         switch (event.isApproved) {
          case true:
           backgroundColor = '#2BC38B';
           break;
          case false:
           backgroundColor = '#D9512C';
           break;
         }

         return { style: { backgroundColor } };
        }}
       />
      </CardContent>
     </Card>
    </Container>
   </Box>
  </EmployeeDialogHOC>
 );
};

export default CalenderOfEmployee;
