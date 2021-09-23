import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import {
 createAccessoryReducer,
 createAccessoryTypeReducer,
 deleteAccessoryReducer,
 listAccessoryReducer,
 listAccessoryTypeReducer,
 updateAccessoryReducer
} from './reducers/accessoryReducer';
import {
 banCustomerReducer,
 customerNotificationReducer,
 listCustomerReducer
} from './reducers/customerReducer';
import {
 createManufacturerReducer,
 createModelReducer,
 listAllManufacturerReducer,
 listManufacturerReducer,
 updateManufacturerReducer
} from './reducers/manufacturerReducer';
import {
 createCouponReducer,
 createServiceReducer,
 createServiceTypeReducer,
 deleteCouponReducer,
 deleteServiceReducer,
 listAllServiceReducer,
 listServiceReducer,
 listServiceTypeReducer,
 updateCouponReducer,
 updateServiceReducer
} from './reducers/serviceReducer';
import {
 createPackageReducer,
 deletePackageReducer,
 listPackageReducer,
 PackageIDReducer,
 updatePackageReducer
} from './reducers/packageReducer';
import {
 userLoginReducer,
 listEmployeeReducer,
 createEmployeeReducer,
 reloadReducer,
 deleteEmployeeReducer,
 updateEmployeeReducer,
 listEmployeeAbsentReducer,
 updateEmployeeAbsentReducer
} from './reducers/userReducer';
import {
 listOrderByIDReducer,
 listOrderDoneReducer,
 listOrderReducer,
 listOrderStatusReducer,
 paymentCashReducer
} from './reducers/orderReducer';
import {
 listAllTransactionReducer,
 listTransactionReducer
} from './reducers/transactionReducer';

const initialState = {
 userLogin: {
  userInfo: localStorage.getItem('userInfo')
   ? JSON.parse(localStorage.getItem('userInfo'))
   : null
 }
};
const reducer = combineReducers({
 userLogin: userLoginReducer,
 employeeList: listEmployeeReducer,
 createEmployee: createEmployeeReducer,
 triggerReload: reloadReducer,
 employeeDelete: deleteEmployeeReducer,
 editEmployee: updateEmployeeReducer,
 manufacturerList: listManufacturerReducer,
 customerList: listCustomerReducer,
 accessoryList: listAccessoryReducer,
 serviceList: listServiceReducer,
 createAccessories: createAccessoryReducer,
 accessoryDelete: deleteAccessoryReducer,
 editAccessory: updateAccessoryReducer,
 createServices: createServiceReducer,
 typeList: listServiceTypeReducer,
 serviceDelete: deleteServiceReducer,
 editService: updateServiceReducer,
 accessoryTypeList: listAccessoryTypeReducer,
 createAccessoryType: createAccessoryTypeReducer,
 createServiceType: createServiceTypeReducer,
 packageList: listPackageReducer,
 createPackage: createPackageReducer,
 serviceListAll: listAllServiceReducer,
 packageDelete: deletePackageReducer,
 manufacturerListAll: listAllManufacturerReducer,
 createManufacture: createManufacturerReducer,
 createModel: createModelReducer,
 editPackage: updatePackageReducer,
 packageID: PackageIDReducer,
 banCus: banCustomerReducer,
 editManufacturer: updateManufacturerReducer,
 createCoupon: createCouponReducer,
 editCoupon: updateCouponReducer,
 couponDelete: deleteCouponReducer,
 ordersList: listOrderReducer,
 transactionList: listTransactionReducer,
 transactionAllList: listAllTransactionReducer,
 customerNotification: customerNotificationReducer,
 employeeAbsentList: listEmployeeAbsentReducer,
 updateAbsentEmployee: updateEmployeeAbsentReducer,
 orderStatusList: listOrderStatusReducer,
 orderStatusIdList: listOrderByIDReducer,
 paymentCash: paymentCashReducer
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
 reducer,
 initialState,
 composeEnhancer(applyMiddleware(thunk))
);

export default store;
