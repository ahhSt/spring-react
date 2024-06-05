import React from 'react';
import PropTypes from "prop-types";

import Button from '@mui/material/Button/Button';

//propType 체크
ButtonBox.propTypes = {
    isSave : PropTypes.bool,
    isUpdate : PropTypes.bool,
    onInsertUser : PropTypes.func,
    onCancel : PropTypes.func,
    onUpdateUser : PropTypes.func
};

function ButtonBox(props) {
    if (props.isSave) {
        return (
            <div className="userInFormBtns">
                <Button size="small" variant="contained" onClick={props.onInsertUser}> SAVE </Button>
                <Button size="small" variant="outlined" onClick={props.onCancel} > CANCEL </Button>
            </div>
        )
    } else if (props.isUpdate) {
        return (
            <div className="userInFormBtns">
                <Button size="small" variant="contained" id="updateBtn" onClick={props.onUpdateUser}> UPDATE </Button>
                <Button size="small" variant="outlined" onClick={props.onCancel}> CANCEL </Button>
            </div>
        )
    } else {
        return (
            <div className="userInFormBtns">
                <Button size="small" variant="contained" id="updateBtn" disabled> UPDATE </Button>
            </div>
        )
    }
}

export default ButtonBox;