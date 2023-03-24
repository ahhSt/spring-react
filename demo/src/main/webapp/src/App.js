import React from 'react';
import './App.css';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router,} from "react-router-dom";
import { NavigationBar } from './components/NavigationBar';
import Sidebar from './components/Sidebar';

import Contents from './routes';

function App() {

  return (
        <React.Fragment>
          <Router>
            <NavigationBar />
            <Sidebar />
            <Contents />
          </Router>
        </React.Fragment>
  );
}

export default App;