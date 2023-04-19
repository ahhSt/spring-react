import React from 'react';
import './App.css';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router,} from "react-router-dom";

import Routes from './routes';
import Dashboard from 'pages/Dashboard';

function App() {

  return (
        <React.Fragment>
          <Router>
            <Dashboard />
          </Router>
        </React.Fragment>
  );
}

export default App;