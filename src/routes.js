import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import AccessoryList from 'src/pages/AccessoryList';
import CustomerList from 'src/pages/CustomerList';
import Dashboard from 'src/pages/Dashboard';
import EmployeeList from 'src/pages/EmployeeList';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import CalenderOfEmployee from './pages/CalenderOfEmployee';
import Manufacturer from './pages/ManufacturerList';
import OrderHistoryList from './pages/OrderHistoryList';
import OrderPaymentList from './pages/OrderPaymentList';
import PackageList from './pages/PackageList';
import Report from './pages/Report';
import ServiceList from './pages/ServiceList';
const routes = [
 {
  path: '/',
  element: <MainLayout />,
  children: [
   { path: 'login', element: <Login /> },
   { path: '404', element: <NotFound /> },
   { path: '/', element: <Navigate to="/login" /> },
   { path: '*', element: <Navigate to="/404" /> }
  ]
 },
 {
  path: 'app',
  element: <DashboardLayout />,
  children: [
   { path: 'customers', element: <CustomerList /> },
   { path: 'manufacturer', element: <Manufacturer /> },
   { path: 'dashboard', element: <Dashboard /> },
   { path: 'accessories', element: <AccessoryList /> },
   { path: 'service', element: <ServiceList /> },
   { path: 'packages', element: <PackageList /> },
   { path: 'employee', element: <EmployeeList /> },
   { path: 'report', element: <Report /> },
   { path: 'calender', element: <CalenderOfEmployee /> },
   { path: 'orders', element: <OrderPaymentList /> },
   { path: 'history', element: <OrderHistoryList /> },
   { path: '*', element: <Navigate to="/404" /> }
  ]
 }
];

export default routes;
