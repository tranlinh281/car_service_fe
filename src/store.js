import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { userLoginReducer, listEmployeeReducer } from './reducers/userReducer';

const initialState = {
 userLogin: {
  userInfo: localStorage.getItem('userInfo')
   ? JSON.parse(localStorage.getItem('userInfo'))
   : null
 }
};
const reducer = combineReducers({
 userLogin: userLoginReducer,
 employeeList: listEmployeeReducer
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
 reducer,
 initialState,
 composeEnhancer(applyMiddleware(thunk))
);

export default store;
