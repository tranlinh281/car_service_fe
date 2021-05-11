import logo from './logo.svg';
import './App.css';
import Dashboard from './templates/dashboard';
import Login from './layouts/Login';
import { Route, Router } from 'react-router';
import { createBrowserHistory } from 'history';

function App() {
  const history = createBrowserHistory();
  return (
    <div className="App">
      <Router history={history}>
        <Route path = "/" component = {Login}></Route>
      </Router>
      {/* <Dashboard></Dashboard> */}
    </div>
  );
}

export default App;
