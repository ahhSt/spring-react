import React, {useEffect, useState} from "react";
import axios from "axios";

const Customer = () => {

    const [data, setData] = useState([]);

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