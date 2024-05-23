import React, { useState, useEffect, useRef, forwardRef } from 'react';
import axios from '../../common/ApiFunction';
import Button from '@mui/material/Button/Button';
import Box from '@mui/material/Box';

import './menu.css';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import MenuItems from './MenuItems';

function MenuListForm() {
    const [menuList, setMenuList] = useState([]);
    const [selectMenu, setSelectMenu] = useState({});
    const [btnVisible, setBtnVisible] = useState(false);
    const [isSave, setIsSave] = useState(false);

    //처음 렌더링시 실행(메뉴데이터 불러오기)
    useEffect(() => {
        getMenuList();
    }, []);

    const menuSelect = (menu) => {
        setSelectMenu(menu);
    }

    //메뉴 호출
    function getMenuList() {
        try{
            axios.get('/menulist')
            .then(response => {
                setMenuList(listSorting(response.data));
                setSelectMenu(response.data[0]);
            });
        }
        catch (e) {
            console.log('Error');
        }
    }

    //메뉴 계층형 처리
    function listSorting(menuList) {
        let mainMenuList = menuList.filter((data) => data.parent_menu_obj_id == null );
        let totalList = [];
        for (let menu of mainMenuList) {
          totalList.push(menu);
          let subMenuList = menuList.filter((data) => data.parent_menu_obj_id == menu.menu_obj_id);
          subMenuList = subMenuList.sort((a, b) => a.menu_order - b.menu_order);
          totalList = totalList.concat(subMenuList);
        }
        return totalList;
    }

    //Add Button
    const onAddMenu = () => {
        if(selectMenu.parent_menu_obj_id == null){
            alert('메뉴를 추가할 하위 메뉴를 선택해주세요.');
        }
        else{
            //form값 초기화
            let tempMenu = {
                'menu_obj_id': 'New_Menu' ,
                'parent_menu_obj_id': selectMenu.parent_menu_obj_id ,
                'menu_nm': null ,
                'menu_path': null ,
                'obj_yn': 'Y' ,
                'menu_order': selectMenu.menu_order + 1 ,
                'menu_desc': null
            };
            setSelectMenu(tempMenu);
            setIsSave(true);
        }
    }

    //Save Button
    const onSaveMenu = () => {
        const saveMenuInfo = async (saveMenu) => {
            //객체지정시 인코딩 오류발생 해결필요, Post 구현
          try{
            await axios.get('/insertMenu',
                { params : {
                parent_menu_obj_id : saveMenu.parent_menu_obj_id,
                menu_nm : saveMenu.menu_nm,
                menu_path : saveMenu.menu_path,
                obj_yn : saveMenu.obj_yn,
                menu_order : saveMenu.menu_order,
                menu_desc : saveMenu.menu_desc
                }
            });
            setIsSave(false);
            getMenuList();
            alert('저장되었습니다.');
          }
          catch (e) {
            alert('Error');
          }
        }

        if(window.confirm("메뉴를 저장하시겠습니까?")){
            saveMenuInfo(selectMenu);
        }
    }

    //Delete (Update문)
    const onDeleteMenu = () => {
        const deleteCustomerInfo = async (deleteMenu) => {
          try{
            await axios.get('/deleteMenu',
                { params : {
                menu_obj_id : deleteMenu.menu_obj_id,
                parent_menu_obj_id : deleteMenu.parent_menu_obj_id,
                menu_order : deleteMenu.menu_order
                }
            });
            getMenuList();
            alert('삭제되었습니다.');
          } //endTry
          catch (e) {
            alert('Error');
          }
        }

        if(selectMenu.important_flg === "Y"){
            window.alert("해당 메뉴는 삭제할 수 없습니다.");
        }else if(selectMenu.parent_menu_obj_id === null){
            window.alert("상위 메뉴는 삭제할 수 없습니다.");
        }else{
            if(window.confirm(selectMenu.menu_nm+" 메뉴를 삭제하시겠습니까?")){
                deleteCustomerInfo(selectMenu);
            }
        }
    }

    //Update
    const onUpdateMenu = () => {
        const updateMenuInfo = async (updatingMenu) => {
            //객체지정시 인코딩 오류발생 해결필요
          try{
            await axios.get('/updateMenu',
                { params : {
                menu_obj_id : updatingMenu.menu_obj_id,
                menu_nm : updatingMenu.menu_nm,
                menu_path : updatingMenu.menu_path,
                obj_yn : updatingMenu.obj_yn,
                menu_order : updatingMenu.menu_order,
                menu_desc : updatingMenu.menu_desc
                }
            })
            .then(response => {
                //setSelectMenu(updatingMenu);
                getMenuList();
            });
            alert('수정되었습니다.');
            setBtnVisible(false);
          }
          catch (e) {
            alert('Error');
          }
        }

        if(window.confirm(selectMenu.menu_nm + "메뉴 정보를 수정하시겠습니까?")){
            updateMenuInfo(selectMenu);
        }

    }

    return (
        <div className="menu_container" >
            <div className="menuList">
                <div className="menuListTitle">MENU LIST</div>
                <MenuItems menuList={menuList} menuSelect = {menuSelect}/>
                <div className="menuBtns">
                    <Stack direction="row" spacing={2}>
                        <Button size="small" variant="contained" startIcon={<AddIcon/>} onClick={onAddMenu}> ADD </Button>
                        <Button size="small" variant="outlined" startIcon={<RemoveIcon/>} onClick={onDeleteMenu}> DEL </Button>
                    </Stack>
                </div>
            </div>
            <div className="menuForm">
                <div className="menuFormTitle">MENU INFORMATION</div>
                <div className="menuFormContent">
                    <Box
                        component="form"
                        sx={{ '& .MuiTextField-root': { m: 1, width: '480px' },}}
                        noValidate
                        autoComplete="off" >
                        <div>
                            <TextField disabled id="filled-disabled" label="ID" variant="filled" value={selectMenu.menu_obj_id || ""}/>
                            <TextField id="outlined-required" label="Name" value={selectMenu.menu_nm || ""}
                                onChange={(e)=>{setSelectMenu({...selectMenu,'menu_nm':e.target.value}); setBtnVisible(true)}}/>
                            <TextField id="outlined-required" label="Menu File Path" value={selectMenu.menu_path || ""}
                                onChange={(e)=>{setSelectMenu({...selectMenu,'menu_path':e.target.value}); setBtnVisible(true)}} />
                            <TextField
                                id="outlined-select-currency"
                                select label="Show menu"
                                value={selectMenu.obj_yn || ""}
                                onChange={(e)=>(setSelectMenu({...selectMenu,'obj_yn':e.target.value}))}
                                >
                                    <MenuItem key="show" value="Y">Show</MenuItem>
                                    <MenuItem key="hide" value="N">Hide</MenuItem>
                            </TextField>
                            <TextField id="outlined-required" label="Menu Order" value={selectMenu.menu_order || 0}
                                onChange={(e)=>{setSelectMenu({...selectMenu,'menu_order':e.target.value}); setBtnVisible(true)}} />
                            <TextField id="outlined-required" label="Description" value={selectMenu.menu_desc || ""}
                                onChange={(e)=>{setSelectMenu({...selectMenu,'menu_desc':e.target.value}); setBtnVisible(true)}} />
                            <div className="menuFormBtns">
                                { isSave
                                ? <Button size="small" variant="contained" id="SaveBtn" onClick={onSaveMenu} > SAVE </Button>
                                : btnVisible
                                    ? <Button size="small" variant="contained" id="updateBtn" onClick={onUpdateMenu}> UPDATE </Button>
                                    : <Button size="small" variant="contained" id="updateBtn" disabled> UPDATE </Button> }
                            </div>
                        </div>
                    </Box>
                </div>
            </div>
        </div> /*menu_container*/
    );
}

function App() {
    return (
        <div>
            < MenuListForm />
        </div>
    );
}

export default App;