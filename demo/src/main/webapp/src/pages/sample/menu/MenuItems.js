import React  from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PropTypes from "prop-types";

//propType 체크
MenuItems.propTypes = {
    menuList : PropTypes.array,
    setSelectMenu : PropTypes.func,
    getMenuList : PropTypes.func,
    isSave : PropTypes.bool,
    setIsSave : PropTypes.func,
    selectedMenuID : PropTypes.string,
    setSelectedMenuID : PropTypes.func,
    setTempMenu : PropTypes.func
};

function MenuItems(props) {
    //메뉴 선택시 상위 컴포넌트에 메뉴정보 전달
    const updateMenuInfo = (e) => {
        let currentMenu = props.menuList.find(data => data.menu_obj_id === e.target.id);
        props.setSelectMenu(currentMenu);
        props.setTempMenu(currentMenu);
        props.setSelectedMenuID(e.target.id);

        if(props.isSave){
            if(confirm("작성중인 내용이 있습니다. 삭제하시겠습니까?")){
                if(props.isSave){props.setIsSave(false);}
                props.getMenuList();
            }
        }
    }

    //메뉴 렌더링
    const sortedList = props.menuList.map(data => {
        if(data.parent_menu_obj_id == null){
            return <div id={data.menu_obj_id} key={data.menu_obj_id} className="mainMenu"> <KeyboardArrowDownIcon/> {data.menu_nm}</div>
        }else if(data.important_flg === "Y"){
            return <button onClick={updateMenuInfo} id={data.menu_obj_id} key={data.menu_obj_id} className="subMenu unable" > - {data.menu_nm}(Unable to delete)</button>
        }else if(props.selectedMenuID === data.menu_obj_id ) {
            return <button onClick={updateMenuInfo} id={data.menu_obj_id} key={data.menu_obj_id} className="subMenu" style={{background:'rgba(25, 118, 210, 0.1)'}}> - {data.menu_nm}</button>
        }else{
            return <button onClick={updateMenuInfo} id={data.menu_obj_id} key={data.menu_obj_id} className="subMenu" > - {data.menu_nm}</button>
        }
    })

    return(
        <div className="menuListContent">
            {sortedList}
        </div>
    )
}

export default MenuItems;