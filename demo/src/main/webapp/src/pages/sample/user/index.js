import React, { useState } from "react";
import './user.css';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import UserTable from './userTable'
import UserInform from './userInform'


function UserLayout(props) {
    return (
        <div className="userContainer" >
            <div className="userListContainer">
                <div className="userSearchBox">
                    <span>User ID</span>
                    <input type="text" id="searchUserInput" placeholder="User ID"/>
                    <Button variant="contained" startIcon={<SearchIcon />}>Search</Button>
                </div>
                <UserTable />
                <div className="buttonBox">
                    <Button size="small" variant="contained" startIcon={<AddIcon />}> ADD </Button>
                    <Button size="small" variant="outlined" startIcon={<RemoveIcon />}> DEL </Button>
                </div>
            </div>
            <div className="userInformContainer">
                <div className="userInformTitle">
                    User Infomation
                </div>
                <UserInform />
                <div className="userInFormBtns">
                    <Button size="small" variant="contained"> SAVE </Button>
                </div>
            </div>
        </div>
    );
}

function App() {
    return (
        <div>
            <UserLayout />
        </div>
    );
}

export default App;