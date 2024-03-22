import React from 'react';
import './App.css';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

//import Routes from './routes';
import Dashboard from 'pages/Dashboard';
import Login from 'pages/Login';

function App() {

  return (
        <React.Fragment>
          <Router>
            <Routes>
                <Route path={'/login'} element={<Login />} />
                <Route path={'/*'} element={<Dashboard />} />
            </Routes>
          </Router>
        </React.Fragment>
  );
}

export default App;