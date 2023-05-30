import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import ItemList from './ItemList';

const ListItems = (props) => {
    const {header, items, userInput, type} = props;

    const selectedList = items.filter((item) => {
        if (userInput === "") return true;
        return (
               (item.korName.toLowerCase().includes(userInput.toLowerCase())) 
            || (item.engName.toLowerCase().includes(userInput.toLowerCase()))
            || (item.engInitName.toLowerCase().includes(userInput.toLowerCase()))
            );
    });

    return (
        <ItemList header={header} items={selectedList} type={type}/>
    );
};

const SearchItem = (props) => {
    // MEMO: setUserInput에 상관 없이, SearchItem에서는 전체 화면 렌더링이 안되므로 포커스 유지가 가능한건가?
    const {userInput, setUserInput} = props;
  
    return (
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={userInput} onChange={e => setUserInput(e.target.value)} />
      </form>
    )
};

export const SelectedListItem = (props) => {

    const {header, items, type} = props;

    const [userInput, setUserInput] = useState("");

    return (
        <Box sx={{ width: '100%', maxwidth: 360, bgcolor: 'background.paper' }}>
            <SearchItem userInput={userInput} setUserInput={setUserInput} />
            <ListItems header={header} items={items} userInput={userInput} type={type} />
        </Box>
    );
}