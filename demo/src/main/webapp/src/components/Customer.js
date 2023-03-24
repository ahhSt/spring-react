import React, {useEffect, useState} from "react";
import axios from "axios";

interface CustomerProps {
  id?: string;
  date: string;
  email: string;
  name: string;
}

const Customer = () => {

    const [data, setData] = useState<CustomerProps[]>([] as CustomerProps[]);

    useEffect(() => {

        axios.get("http://localhost:82/api/customer",{} )
        .then((response) => {
            console.log(response.data);
            return setData(response.data);
        });
    }, []);

    return (
        <div>
            <ul>{data.map((str, idx) => (<li key={idx}>{str.name}</li>))}</ul>
        </div>
    );
};

export default Customer;