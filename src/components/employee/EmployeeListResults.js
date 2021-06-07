import { listEmployee } from 'src/actions/userAction';
import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
export default function EmployeeListResult({  employees }) {

  return (
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox"></TableCell>
                <TableCell>Tài Khoản</TableCell>
                <TableCell>Họ tên</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Số Điện Thoại</TableCell>
                <TableCell>Loại người dùng</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees?.map((customer) => (
                <TableRow hover key={customer.taiKhoan}>
                  <TableCell padding="checkbox"></TableCell>
                  <TableCell>{customer.taiKhoan}</TableCell>
                  <TableCell>{customer.hoTen}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.soDt}</TableCell>
                  <TableCell>{customer.maLoaiNguoiDung}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>

  );
}