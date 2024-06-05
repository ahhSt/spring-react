import React, { useState, useEffect } from 'react';
import axios from '../../common/ApiFunction';
import './user.css';

import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import UserTable from './UserTable'
import UserInform from './UserInform'
import ButtonBox from "./ButtonBox";


function UserLayout(props) {
    const [userPage, setUserPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [userList, setUserList] = useState([]);
    const [selectUser, setSelectUser] = useState({});
    const [tempUser, setTempUser] = useState({});
    const [searchWord, setSearchWord] = useState("");
    const [isIdEditable, setIsIdEditable] = useState(false);
    /*버튼 변경여부*/
    const [isSave, setIsSave] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);

    //처음 렌더링시 실행(리스트 불러오기)
    useEffect(() => {
        getUserList(1,"");
    }, []);

    //페이지 변경시마다 수행
    useEffect(() => {
        getUserList(userPage,searchWord);
    }, [userPage]);

    //검색버튼 클릭시
    const searchUserList = (e) => {
        let inputValue = document.getElementById('searchUserInput').value;
        if(inputValue === null){
            alert("검색값을 입력해 주세요")
        }else{
            setUserPage(1);
            setSearchWord(inputValue);
            getUserList(1,inputValue);
        }
    }

    //List 호출
    function getUserList(page, inputWord) {
        axios.get('/userListPaging',
            { params : {
                    page : page,
                    userId : inputWord }
            })
            .then(response => {
                setUserList(response.data.list);
                setMaxPage(response.data.pagination===null?1:response.data.pagination.endPage);
            })
            .catch(e => console.log("Failed to run promise", e));
    }

    //Delete (Update문)
    const onDeleteUser = () => {
        const deleteUserInfo = async (userID) => {
            try{
                await axios.delete('/userDelete/'+userID );
                getUserList(userPage,document.getElementById('searchUserInput').value);
                alert('삭제되었습니다.');
            } //endTry
            catch (e) {
                alert('Error');
            }
        }
        if(window.confirm(selectUser.usr_nm+" 유저를 삭제하시겠습니까?")){
            deleteUserInfo(selectUser.usr_id);
        }
    }

    //Add Button
    const onAddBtn = (e) => {
        if(isSave){
            alert("작성중인 내용이 있습니다.");
        }else{
            setIsIdEditable(true);
            let tempAddUser = {
                'usr_id': '' ,
                'usr_nm': ''
            };
            setUserList([...userList, tempAddUser]);
            setSelectUser(tempAddUser);
            setIsSave(true);
        }

    }

    //Insert Button
    const onInsertUser = () => {
        const insertUserInfo = async ( userdto ) => {
            let tempAddUser = {
                'usr_id': userdto.usr_id ,
                'usr_nm': userdto.usr_nm
            };
            try{
                await axios.post('/userInsert',
                    {usr_id: userdto.usr_id,
                        usr_nm: userdto.usr_nm
                    }
                );
                setUserList([...userList, tempAddUser]);
                setIsSave(false);
                setIsIdEditable(false);
                alert('추가되었습니다.');
            } //endTry
            catch (e) {
                alert('Error');
            }
        }
        if(window.confirm("유저를 생성하시겠습니까?")){
            insertUserInfo(selectUser);
        }
    }

    //Update Button
    const onUpdateUser = () => {
        const updateUserInfo = async ( userdto ) => {
            try{
                await axios.post('/userUpdate',
                    {usr_id: userdto.usr_id,
                        usr_nm: userdto.usr_nm
                    }
                );
                getUserList(1,"");
                setIsUpdate(false);
                alert('수정되었습니다.');
            } //endTry
            catch (e) {
                alert('Error');
            }
        }
        if(window.confirm("유저정보를 수정하시겠습니까?")){
            updateUserInfo(selectUser);
        }
    }
    //취소버튼
    const onCancel = () => {
        if(window.confirm("유저 정보 수정을 취소하시겠습니까?")){
            getUserList(userPage,document.getElementById('searchUserInput').value);
            setIsSave(false);
            setIsUpdate(false);
            setSelectUser(tempUser);
        }
    }

    return (
        <div className="userContainer" >
            <div className="userListContainer">
                <div className="userSearchBox">
                    <span>User ID</span>
                    <input type="text" id="searchUserInput" placeholder="User ID"/>
                    <Button variant="contained" startIcon={<SearchIcon />} onClick={(e)=>{searchUserList(e);}}>Search</Button>
                </div>
                <UserTable userList = {userList} setSelectUser={setSelectUser} userPage={userPage} setUserPage={setUserPage} maxPage={maxPage} isSave={isSave} setIsSave={setIsSave} setTempUser={setTempUser}/>
                <div className="buttonBox">
                    <Button size="small" variant="contained" startIcon={<AddIcon />} onClick={onAddBtn}> ADD </Button>
                    <Button size="small" variant="outlined" startIcon={<RemoveIcon />} onClick={onDeleteUser}> DEL </Button>
                </div>
            </div>
            <div className="userInformContainer">
                <div className="userInformTitle"> User Infomation </div>
                <UserInform selectUser={selectUser} setSelectUser={setSelectUser} isIdEditable={isIdEditable} setIsIdeditable={setIsIdEditable} setIsUpdate={setIsUpdate} setTempUser={setTempUser}/>
                <ButtonBox onInsertUser={onInsertUser} onUpdateUser={onUpdateUser} onCancel={onCancel} isSave={isSave} isUpdate={isUpdate} />
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