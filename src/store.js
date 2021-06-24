import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import {
 createAccessoryReducer,
 deleteAccessoryReducer,
 listAccessoryReducer,
 updateAccessoryReducer
} from './reducers/accessoryReducer';
import { listCustomerReducer } from './reducers/customerReducer';
import { listManufacturerReducer } from './reducers/manufacturerReducer';
import {
 createServiceReducer,
 deleteServiceReducer,
 listServiceReducer,
 listServiceTypeReducer,
 updateServiceReducer
} from './reducers/serviceReducer';
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
 createEmp: createEmployeeReducer,
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
 editService:updateServiceReducer
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
 reducer,
 initialState,
 composeEnhancer(applyMiddleware(thunk))
);

export default store;
