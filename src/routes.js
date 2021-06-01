import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Account from 'src/pages/Account';
import CustomerList from 'src/pages/CustomerList';
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import ProductList from 'src/pages/ProductList';
import Settings from 'src/pages/Settings';
import EmployeeList from 'src/pages/EmployeeList';
import Report from 'src/pages/Report';

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
   { path: 'account', element: <Account /> },
   { path: 'customers', element: <CustomerList /> },
   { path: 'dashboard', element: <Dashboard /> },
   { path: 'products', element: <ProductList /> },
   { path: 'settings', element: <Settings /> },
   { path: 'employee', element: <EmployeeList /> },
   { path: 'report', element: <Report /> },
   { path: '*', element: <Navigate to="/404" /> }
  ]
 }
];

export default routes;
