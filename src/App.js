import logo from './logo.svg';
import './App.css';
import Dashboard from './templates/Dashboard';
import Login from './layouts/Login';
import { createBrowserHistory } from 'history';

function App() {
  const history = createBrowserHistory();
  return (
    <div className="App">
      {/* <Router history={history}>
        <Route path = "/" component = {Dashboard}></Route>
        <Route path = "/login" component = {Login}></Route>

      </Router> */}
      {/* <Dashboard></Dashboard> */}
    </div>
  );
}

export default App;
