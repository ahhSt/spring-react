import React from 'react';
import './App.css';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router,} from "react-router-dom";
import { NavigationBar } from './components/NavigationBar';
import Sidebar from './components/Sidebar';

import Routes from './routes';
import Dashboard from 'pages/Dashboard';

function App() {

  return (
        <React.Fragment>
          {/* <Router>
            <NavigationBar />
            <Sidebar />
            <Routes />
          </Router> */}
          <Router>
            <Dashboard />
          </Router>
        </React.Fragment>
  );
}

export default App;