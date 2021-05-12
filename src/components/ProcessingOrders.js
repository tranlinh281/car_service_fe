import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../templates/Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(0, '1', 'Elvis Presley', '50B-14598', 'Sửa chữa nhẹ', 1),
  createData(1, '2', 'Paul McCartney', '30A-12345', 'Bảo dưỡng nhẹ', 1),
  createData(2, '3', 'Tom Scholz', '20C-23456', 'Bảo dưỡng trung bình', 2),
  createData(3, '4', 'Michael Jackson', '43D-98765', 'Sửa chữa nhẹ', 1),
  createData(4, '5', 'Bruce Springsteen', '77C-33421', 'Sửa chữa nặng', 3),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function ProcessingOrders() {
  const classes = useStyles();
  return (
    <>
    <React.Fragment>
      <Title>Tổng Quát</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>STT</TableCell>
            <TableCell>Khách hàng</TableCell>
            <TableCell>BKS</TableCell>
            <TableCell>Loại</TableCell>
            <TableCell align="right">Chuyền</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
    </>
  );
}