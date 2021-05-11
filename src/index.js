import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import {createBrowserHistory} from 'history'
import Login from './layouts/Login';
import Dashboard from './templates/Dashboard';

const hist = createBrowserHistory();
ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/admin" component={Dashboard} />
      {/* <Route path="/staff" component={Staff} /> */}
      <Redirect from="/" to="/login" />
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
