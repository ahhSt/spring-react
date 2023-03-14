import React from 'react';
import './App.css';
import axios from "axios";
import {useEffect, useState} from "react";

import { SideBar } from "./layout/SideBar";

function App() {

    interface Customer {
        id: string;
        name: string;
        email: string;
        date: string;
    }

    const [data, setData] = useState<Customer[]>([] as Customer[]);

    useEffect(() => {

        axios.get("http://localhost:82/api/customer",{} )
        .then((response) => {
            console.log(response.data);
            return setData(response.data);
        });
    }, []);

  return (
      <div className="App">
{/*         <ul>{data.map((str, idx) => (<li key={idx}>{str.name}</li>))}</ul> */}
        <SideBar />
      </div>

  );
}

export default App;