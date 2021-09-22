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
 'February'
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

// const { data } = useSelector((state) => state.transactionAllList);
// console.log(data, 'debug line chart');
