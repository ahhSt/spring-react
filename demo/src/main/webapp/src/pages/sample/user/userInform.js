import React, {useState} from "react";
import PropTypes from "prop-types";
import './user.css';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';


//propType 체크
UserInform.propTypes = {
    isIdEditable : PropTypes.bool,
    selectUser : PropTypes.object,
    setSelectUser : PropTypes.func,
    setIsIdEditable : PropTypes.func,
    setIsUpdate : PropTypes.func
};

function UserInform(props) {
    return (
        <Box className="userInfoBox"
             component = "form"
             sx={{ '& .MuiTextField-root': { m: 1, width: '380px' },}}
             noValidate
             autoComplete="off" >
            <div>
                {props.isIdEditable
                ? <TextField id="filled-disabled" label="User ID(BART address, e.g. sample@bart.gov or sample)" value={props.selectUser.usr_id || ""}
                             focused onChange={(e)=>{props.setSelectUser({...props.selectUser,'usr_id':e.target.value}); props.setIsUpdate(true);}} />
                : <TextField disabled id="filled-disabled" label="User ID(BART address, e.g. sample@bart.gov or sample)" value={props.selectUser.usr_id || "User ID"} /> }
                 <TextField id="outlined-required" label="User Name" value={props.selectUser.usr_nm || "User Name"}
                            onChange={(e)=>{props.setSelectUser({...props.selectUser,'usr_nm':e.target.value}); props.setIsUpdate(true);}} />
                <TextField disabled id="outlined-required" label="Register Datetime" value={props.selectUser.reg_dtime || "YYYY-MM-DD"}/>
                <TextField disabled id="outlined-required" label="Update Datetime" value={props.selectUser.upd_dtime || "YYYY-MM-DD"}/>
            </div>
        </Box>
    );
}

export default UserInform;