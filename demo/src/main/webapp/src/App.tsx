import React from 'react';
import './App.css';

import { SideBar } from "./layout/SideBar";
import Customer from "./components/Customer";
import Routes from "routes";

function App() {

  return (
      <div className="App">
        <Customer />
        <Routes />
      </div>

  );
}

export default App;