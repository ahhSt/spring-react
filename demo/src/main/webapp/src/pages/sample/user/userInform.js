import React, { useState } from "react";
import './user.css';

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function UserInform(props) {
    return (
        <Box className="userInfoBox"
             component = "form"
             sx={{ '& .MuiTextField-root': { m: 1, width: '380px' },}}
             noValidate
             autoComplete="off" >
            <div>
                <TextField disabled id="filled-disabled" label="User ID" defaultValue="001" />
                <TextField id="outlined-required" label="User Name" defaultValue="Code" />
                <TextField disabled id="outlined-required" label="Register Datetime" defaultValue="2000-01-01"/>
                <TextField disabled id="outlined-required" label="Update Datetime" defaultValue="2000-01-01"/>
                <TextField
                    id="outlined-select-currency"
                    disabled
                    select
                    label="Assigned Group"
                    defaultValue="En" >
                    <MenuItem key="En" value="En">Engineering</MenuItem>
                    <MenuItem key="Oc" value="Oc">OCC</MenuItem>
                    <MenuItem key="Bp" value="Bp">BPD</MenuItem>
                    <MenuItem key="St" value="St">StationAgent</MenuItem>
                    <MenuItem key="Fl" value="Fl">Floater</MenuItem>
                </TextField>
            </div>
        </Box>
    );
}

export default UserInform;