import moment from 'moment';

export const arrMonth = [
 'January',
 'February',
 'March',
 'April',
 'May',
 'June',
 'July',
 'August',
 'September',
 'October',
 'November',
 'December'
];

const dateTimes = moment(new Date()).format('dddd');
const dateMinus1 = moment(new Date()).subtract(1, 'day').format('dddd');
const dateMinus2 = moment(new Date()).subtract(2, 'day').format('dddd');
const dateMinus3 = moment(new Date()).subtract(3, 'day').format('dddd');
const dateMinus4 = moment(new Date()).subtract(4, 'day').format('dddd');
const dateMinus5 = moment(new Date()).subtract(5, 'day').format('dddd');
const dateMinus6 = moment(new Date()).subtract(6, 'day').format('dddd');
export const arrDate = [
 dateMinus6,
 dateMinus5,
 dateMinus4,
 dateMinus3,
 dateMinus2,
 dateMinus1,
 dateTimes
];

export const options = {
 scales: {
  yAxes: [
   {
    type: 'linear',
    display: true,
    position: 'left',
    id: 'y-axis-1'
   },
   {
    type: 'bar',
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

export const TITLE_REVENUE_DATE = 'Doanh thu ngày';
export const TITLE_REVENUE_MONTH = 'Doanh thu tháng';
export const TITLE_REVENUE_LATE_7_DAY = 'Thống kê doanh thu 7 ngày gần đây';
export const TITLE_REVENUE_MONTH_WITH = 'Thống kê doanh thu tháng';
export const TITLE_REVENUE_MONTH_WITH_VALUE = 'month';
export const TITLE_DATE = 'Ngày ';
export const TITLE_MONTN = 'Tháng ';
export const TITLE_ORDER_DATE_WITH = 'date';
