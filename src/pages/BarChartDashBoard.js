import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { listAllOrder } from 'src/actions/orderAction';

export default function BarChartDashBoard() {
 const { orders } = useSelector((state) => state.ordersList);
 const dispatch = useDispatch();

 useEffect(() => {
  dispatch(listAllOrder());
 }, [dispatch]);
 const data = {
  labels: ['Đơn đã đặt', 'Đơn đang tiến hành', 'Đơn hoàn thành'],
  datasets: [
   {
    label: 'Ngày hôm nay',
    data: [orders.dateTimeCount, orders.processingDate, orders.done],
    backgroundColor: 'rgb(255, 99, 132)'
   },
   {
    label: 'Tổng đơn',
    data: [orders.allOrder, orders.processingAll, orders.doneAll],
    backgroundColor: 'rgb(54, 162, 235)'
   }
  ]
 };

 const options = {
  scales: {
   yAxes: [
    {
     ticks: {
      beginAtZero: true
     }
    }
   ]
  }
 };
 return (
  <>
   <div className="header">
    <h1 className="title"></h1>
    <div className="links"></div>
   </div>
   <Bar data={data} options={options} />
  </>
 );
}
