import React from 'react';
import PropTypes from "prop-types";

import Button from '@mui/material/Button/Button';

//propType 체크
ButtonBox.propTypes = {
    isSave : PropTypes.bool,
    btnVisible : PropTypes.bool,
    onSaveMenu : PropTypes.func,
    onCancel : PropTypes.func,
    onUpdateMenu : PropTypes.func
};

function ButtonBox(props) {
    if (props.isSave) {
        return (
            <div className="menuFormBtns">
                <Button size="small" variant="contained" id="SaveBtn" onClick={props.onSaveMenu}> SAVE </Button>
                <Button size="small" variant="outlined" onClick={props.onCancel} > CANCEL </Button>
            </div>
        )
    } else if (props.btnVisible) {
        return (
            <div className="menuFormBtns">
                <Button size="small" variant="contained" id="updateBtn" onClick={props.onUpdateMenu}> UPDATE </Button>
                <Button size="small" variant="outlined" onClick={props.onCancel}> CANCEL </Button>
            </div>
        )
    } else {
        return (
            <div className="menuFormBtns">
                <Button size="small" variant="contained" id="updateBtn" disabled> UPDATE </Button>
            </div>
        )
    }
}

export default ButtonBox;