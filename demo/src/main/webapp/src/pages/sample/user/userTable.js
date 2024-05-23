import React, { useState } from "react";

import Pagination from '@mui/material/Pagination';

function UserTable(){
    const [isSelect, setIsSelect] = useState('');
    return (
        <div className='tableContainer'>
            <table className='userTable'>
                <thead>
                <tr>
                    <td> No </td>
                    <td> UserID </td>
                    <td> UserName </td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td> 1 </td>
                    <td> UserID </td>
                    <td> UserName </td>
                </tr>
                </tbody>
            </table>

            <Pagination count={10} color="primary" />
        </div>
    );
}

export default UserTable;