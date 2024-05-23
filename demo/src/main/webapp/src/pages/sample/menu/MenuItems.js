import React, { useState, useEffect, useRef, forwardRef } from 'react';
import axios from '../../common/ApiFunction';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import RemoveIcon from '@mui/icons-material/Remove';

function MenuItems(props) {
    const [isSelected, setIsSelected] = useState('');

    //메뉴 선택시 상위 컴포넌트에 메뉴정보 전달
    const updateMenuInfo = (e) => {
        props.menuSelect(props.menuList.find(data => data.menu_obj_id == e.target.id));
        setIsSelected(e.target.id);
    }

    //메뉴 렌더링
    const sortedList = props.menuList.map(data => {
        if(data.parent_menu_obj_id == null){
            return <div id={data.menu_obj_id} key={data.menu_obj_id} className="mainMenu"> <KeyboardArrowDownIcon/> {data.menu_nm}</div>
        }else{
            if(data.important_flg === "Y"){
                return <div onClick={updateMenuInfo} id={data.menu_obj_id} key={data.menu_obj_id} className="subMenu unable" > - {data.menu_nm}(Unable to delete)</div>
            }else if(isSelected == data.menu_obj_id) {
                return <div onClick={updateMenuInfo} id={data.menu_obj_id} key={data.menu_obj_id} className="subMenu" style={{background:'rgba(25, 118, 210, 0.1)'}}> - {data.menu_nm}</div>
            }else{
                return <div onClick={updateMenuInfo} id={data.menu_obj_id} key={data.menu_obj_id} className="subMenu"> - {data.menu_nm}</div>
            }
        }
    })

    return(
        <div className="menuListContent">
            {sortedList}
        </div>
    )
}

export default MenuItems;