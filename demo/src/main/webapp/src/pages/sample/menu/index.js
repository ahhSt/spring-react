import React, { useState, useEffect } from 'react';
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
import ButtonBox from './ButtonBox';

function MenuListForm() {
    const [menuList, setMenuList] = useState([]);
    const [selectMenu, setSelectMenu] = useState({});
    const [tempMenu, setTempMenu] = useState({});
    const [btnVisible, setBtnVisible] = useState(false);
    const [isSave, setIsSave] = useState(false);
    const [selectedMenuID, setSelectedMenuID] = useState('');

    //처음 렌더링시 실행(메뉴데이터 불러오기)
    useEffect(() => {
        getMenuList();
        setSelectMenu(tempMenu);
    }, []);

    //List
    function getMenuList() {
        axios.get('/menuList')
        .then(response => {
            setMenuList(listSorting(response.data));
            setTempMenu(response.data[0]);
        })
        .catch(e => console.log("Failed to run promise", e));
    }

    //메뉴 계층형 처리
    function listSorting(menuList) {
        let mainMenuList = menuList.filter((data) => data.parent_menu_obj_id == null );
        let totalList = [];
        for (let menu of mainMenuList) {
          totalList.push(menu);
          let subMenuList = menuList.filter((data) => data.parent_menu_obj_id === menu.menu_obj_id);
          subMenuList = subMenuList.sort((a, b) => a.menu_order - b.menu_order);
          totalList = totalList.concat(subMenuList);
        }
        return totalList;
    }

    const onAddMenu = () => {
        if(selectMenu.parent_menu_obj_id == null){
            alert('메뉴를 추가할 하위 메뉴를 선택해주세요.');
        }else if(isSave === true){
            alert('메뉴를 생성중입니다. 생성중인 메뉴를 저장해 주세요.');
        }
        else{
            /*Form 값 초기화*/
            let tempMenu = {
                'menu_obj_id': 'New_Menu' ,
                'parent_menu_obj_id': selectMenu.parent_menu_obj_id ,
                'menu_nm': "NEW" ,
                'menu_path': null ,
                'obj_yn': 'Y' ,
                'menu_order': selectMenu.menu_order + 0.5 ,
                'menu_desc': null
            };
            setMenuList(listSorting([...menuList, tempMenu]));
            setSelectMenu(tempMenu);
            setIsSave(true);
            setSelectedMenuID("New_Menu");
        }
    }

    const onSaveMenu = () => {
        const saveMenuInfo = async (saveMenu) => {
            let jsonMenu = JSON.stringify(saveMenu);
          try{
            await axios.post('/insertMenu', {jsonMenu});
            setIsSave(false);
            getMenuList();
            alert('저장되었습니다.');
          }
          catch (e) {
            alert('Error');
          }
        }

        if(window.confirm("메뉴를 저장하시겠습니까?")){
            let savingMenu = {...selectMenu};
            savingMenu.menu_order += 0.5;
            saveMenuInfo(savingMenu);
            setSelectMenu(savingMenu);
        }
    }

    const onDeleteMenu = () => {
        const deleteCustomerInfo = async (deleteMenu) => {
          try{
            await axios.post('/deleteMenu',
                { menu_obj_id : deleteMenu.menu_obj_id,
                    parent_menu_obj_id : deleteMenu.parent_menu_obj_id,
                    menu_order : deleteMenu.menu_order
            });
            getMenuList();
            setSelectMenu(menuList[0]);
            alert('삭제되었습니다.');
          } //endTry
          catch (e) {
            alert('Error');
          }
        }

        if(selectMenu.important_flg === "Y"){
            window.alert("해당 메뉴는 삭제할 수 없습니다.");
        }else if(selectMenu.parent_menu_obj_id === null || selectMenu.parent_menu_obj_id === ""){
            window.alert("상위 메뉴는 삭제할 수 없습니다.");
        }else if (window.confirm(selectMenu.menu_nm + " 메뉴를 삭제하시겠습니까?")) {
            deleteCustomerInfo(selectMenu);
        }
    }

    const onUpdateMenu = () => {
        const updateMenuInfo = async (updatingMenu) => {
            let jsonMenu = JSON.stringify(updatingMenu);
            try{
            await axios.post('/updateMenu', { jsonMenu });
            getMenuList();
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

    const onCancel = () => {
        if(window.confirm("메뉴 수정을 취소하시겠습니까?")){
            getMenuList();
            setIsSave(false);
            setBtnVisible(false);
            setSelectMenu(tempMenu);
        }
    }

    return (
        <div className="menu_container">
            <div className="menuList">
                <div className="menuListTitle">MENU LIST</div>
                <MenuItems
                    menuList={menuList} setSelectMenu={setSelectMenu} getMenuList={getMenuList}
                    isSave={isSave} setIsSave={setIsSave}
                    selectedMenuID={selectedMenuID} setSelectedMenuID={setSelectedMenuID}
                    setTempMenu={setTempMenu}/>
                <div className="menuBtns">
                    <Stack direction="row" spacing={2}>
                        <Button size="small" variant="contained" startIcon={<AddIcon/>}
                                onClick={onAddMenu}> ADD </Button>
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
                            <TextField id="outlined-required" label="Menu Order" value={selectMenu.menu_order || 0} disabled
                                onChange={(e)=>{setSelectMenu({...selectMenu,'menu_order':e.target.value}); setBtnVisible(true)}} />
                            <TextField id="outlined-required" label="Description" value={selectMenu.menu_desc || ""}
                                onChange={(e)=>{setSelectMenu({...selectMenu,'menu_desc':e.target.value}); setBtnVisible(true)}} />
                            <ButtonBox isSave={isSave} onSaveMenu={onSaveMenu} onCancel={onCancel} onUpdateMenu={onUpdateMenu} btnVisible={btnVisible}/>
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