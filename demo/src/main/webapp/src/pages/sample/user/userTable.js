import React, { useState } from "react";
import PropTypes from "prop-types";

import Pagination from '@mui/material/Pagination';

//propType 체크
UserTable.propTypes = {
    userList : PropTypes.array,
    setSelectUser : PropTypes.func,
    setTempUser : PropTypes.func,
    userPage : PropTypes.number,
    setUserPage : PropTypes.func,
    isSave : PropTypes.bool,
    setIsSave : PropTypes.func,
    maxPage : PropTypes.number
};

function UserTable(props){
    const [isSelect, setIsSelect] = useState('');

    //유저 선택시 실행
    /*function selectUser(e){
        setIsSelect(e.target.parentElement.id);

    }*/

    //리스트 렌더링
    /*const userList = props.userList.map((data,index) => {
        let userNum = (props.userPage-1) *10 + (index+1);
        if(isSelect === data.usr_id){
            return (
                <tr key={data.usr_id} id={data.usr_id} style={{background:'rgba(25, 118, 210, 0.1)'}} onClick={(e)=>{selectUser(e); props.setSelectUser(data); props.setTempUser(data);}}>
                    <td> {userNum} </td>
                    <td> {data.usr_id} </td>
                    <td> {data.usr_nm} </td>
                </tr>
            )
        }else{
            return (
                <tr key={data.usr_id} id={data.usr_id} onClick={(e)=>{selectUser(e); props.setSelectUser(data); props.setTempUser(data);}}>
                    <td> {userNum} </td>
                    <td> {data.usr_id} </td>
                    <td> {data.usr_nm} </td>
                </tr>
            )
        }
    })*/




    const userList2 = props.userList.map((data,index) => {
        let userNum = (props.userPage-1) *10 + (index+1);
        function selectUser(e){
            setIsSelect(e.target.parentElement.id);
            props.setSelectUser(data);
            props.setTempUser(data);

        }


        return (
            <tr key={data.usr_id} id={data.usr_id} onClick={(e)=>{selectUser(e); props.setSelectUser(data); props.setTempUser(data);}}>
                <td> {userNum} </td>
                <td> {data.usr_id} </td>
                <td> {data.usr_nm} </td>
            </tr>
        )
    })


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
                    {userList2}
                </tbody>
            </table>

            <Pagination count={props.maxPage} onChange={(e,page)=>{props.setUserPage(page)}} color="primary" />
        </div>
    );
}

export default UserTable;