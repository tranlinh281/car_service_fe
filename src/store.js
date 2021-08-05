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
 listCustomerReducer
} from './reducers/customerReducer';
import {
 createManufacturerReducer,
 createModelReducer,
 listAllManufacturerReducer,
 listManufacturerReducer
} from './reducers/manufacturerReducer';
import {
 createServiceReducer,
 createServiceTypeReducer,
 deleteServiceReducer,
 listAllServiceReducer,
 listServiceReducer,
 listServiceTypeReducer,
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
 updateEmployeeReducer
} from './reducers/userReducer';

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
 banCus: banCustomerReducer
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
 reducer,
 initialState,
 composeEnhancer(applyMiddleware(thunk))
);

export default store;
