import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import Button from '@mui/material/Button/Button';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import TextField from '@mui/material/TextField/TextField';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { ListItem } from '@mui/material';
import { BasicTabs11, test11 } from './TapPanel';

import InputForm from './InputForm';
import { func } from 'prop-types';
import { SearchBar } from 'rsuite/esm/Picker';
import Customer from '../../../components/Customer';





const SearchItem = (props) => {

  // MEMO: setUserInput에 상관 없이, SearchItem에서는 전체 화면 렌더링이 안되므로 포커스 유지가 가능한건가?
  const userInput = props.userInput;
  const setUserInput = props.setUserInput;
  
  console.log("userSearchInput - " + userInput);

  return (
    <form className="d-flex" role="search">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={userInput} onChange={e => setUserInput(e.target.value)} />
      <button className="btn btn-outline-success" type="submit">Search</button>
    </form>
  )
};


const SelectedListItem = (props) => {

  const customers = props.customers;
  const setCustomers = props.setCustomers;
  const selectedIndex = props.selectedIndex;
  const setSelectedIndex = props.setSelectedIndex;
  const tabIndex = props.tabIndex;

  const [userInput, setUserInput] = useState("");


  const ListItems = () => {

    const handleListItemClick = (event, item) => {
      // console.log(item.isNew);
      // setIsNew(item.isNew);
      setSelectedIndex(item.id);
    };

    const selectedList = customers.list.filter((item) => {
      if (userInput === "") return true;
      return item.name.toLowerCase().includes(userInput);
     })
    
    const listItem = selectedList.map((item, idx) =>
      <ListItemButton key={item.id}
        selected={selectedIndex === item.id}
        onClick={(event) => handleListItemClick(event, item)}
      >
        <ListItemText primary={tabIndex == 0 ? (item.name) : (tabIndex == 1 ? (item.email) : (item.date))} />
      </ListItemButton>
    );
  
    return <List component="nav" aria-label="secondary mailbox folder">{listItem}</List>;
  };

  return (
    <Box sx={{ width: '100%', maxwidth: 360, bgcolor: 'background.paper' }}>
      <SearchItem userInput={userInput} setUserInput={setUserInput} />
      <ListItems  />
    </Box>
  );
}


const BoxComponent = (props) => {
  const isNew = props.isNew;
  const customers = props.customers;
  const setCustomers = props.setCustomers;
  const setIsNew = props.setIsNew;
  const setSelectedIndex = props.setSelectedIndex;

  const onAdd = () => {
    if (isNew == false){
      console.log(customers);
      // const lastCust = customers.reduce( (prev, current) => prev.id > current.id ? prev : current);
      // const newId = lastCust.id + 1;
      
      // MEMO: customer 샘플 화면은 아래코드 써야함
      // setCustomers({query: "new", list: [...customers.list, { id: null, name: "New Data", email: "New Data1", date: "New Data2", isNew: true }]});
      setCustomers({query: "new", list: [...customers.list, {
          id: null, 
          name: "New Data", 
          name_kor: "새 데이터", 
          name_eng: "New Data", 
          abbreviation_eng: "New Data", 
          data_type: "varchar", 
          data_length: "255", 
          explanation: "none", 
          isNew: true 
        }]});
    
      setIsNew(true);
      setSelectedIndex(null);
    }
  }

  return (
    <Button variant="contained" startIcon={<PersonAddAltIcon />} onClick={onAdd}>
       Add
    </Button>
  );
}

export default function TestPage() {

  let tempInputValue = "";

  // const [customers, setCustomers] = useState(null);
  const [customers, setCustomers] = useState({query:'', list: []});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isNew, setIsNew] = useState(false);

  const [tabIndex, setTabIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const fetchCustomers = async () => {
    try {
      setError(null);
      setCustomers({query:'', list: null});
      // loading 상태를 true 로 바꿉니다.
      setLoading(true);
      const response = await axios.get(
        '/api/customer'
      );
      // setCustomers(response.data); // 데이터는 response.data 안에 들어있습니다.
      setCustomers({query:"", list: response.data}); // 데이터는 response.data 안에 들어있습니다.

      let minId = response.data[0].id;
      setSelectedIndex(minId);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    console.log("test");
  }, [tabIndex]);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  // if (!customers) return null;
  if (!customers.list) return null;

  // function BoxComponent() {
  //   return (
  //     <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>
  //       <Button>Save</Button>
  //     </Box>
  //   );
  // }

  // function Item() {
  //   return (
  //     <TextField id="outlined-basic" label="Outlined" variant="outlined" />
  //   );
  // }

  const onChangeTab = (indexNum) => {

    setTabIndex(indexNum);
    console.log("tabIndex value: " + tabIndex);
  };


  return (
    <Container maxwidth="sm">
      <Grid container spacing={2}>
        <Grid xs={4}>
          {/* TabPanel에서 Index 요소를 하나 받아와서, selectedListItem에 뿌려줄 수 있도록 해야함, add button도 영향이 있게 하려면..  */}
          <BasicTabs11 onChangeTab={onChangeTab} />
          <SelectedListItem customers={customers} setCustomers={setCustomers} tabIndex={tabIndex} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>
          <BoxComponent isNew={isNew} setIsNew={setIsNew} customers={customers} setCustomers={setCustomers} setSelectedIndex={setSelectedIndex} />
        </Grid>
        <Grid xs={8}>
          <InputForm id={selectedIndex} isNew={isNew} fetchCustomers={fetchCustomers} />
        </Grid>
      </Grid>
    </Container>
  )

 

  // const SearchItem = () => {

  //   const [userInput, setUserInput] = useState("");
  //   tempInputValue = userInput;
  //   console.log("userSearchInput - " + userInput);
  //   console.log("tempInputValue - " + tempInputValue);
  //   return (
  //     <form className="d-flex" role="search" onSubmit={onSubmit}>
  //       <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={userInput} onChange={e => setUserInput(e.target.value)} />
  //       <button className="btn btn-outline-success" type="submit">Search</button>
  //     </form>
  //   )
  // };




  // const handleListItemClick = (event, item) => {
  //   console.log(item.isNew);
  //   // setIsNew(item.isNew);
  //   setSelectedIndex(item.id);
  // };

  // const ListItems = () => {
  //   // TODO: 여기 해야함.. 아래 두개는 왜 안되는것인가.. 
  //   // customers.filter(customers => customers !== tempInputValue);
  //   // customers.filter(customers => customers.includes(tempInputValue));
    
  //   const listItem = customers.map((item, idx) =>
  //     <ListItemButton key={item.id}
  //       selected={selectedIndex === item.id}
  //       onClick={(event) => handleListItemClick(event, item)}
  //     >
  //       <ListItemText primary={tabIndex == 0 ? (item.name) : (tabIndex == 1 ? (item.email) : (item.date))} />
  //     </ListItemButton>
  //   );

  //   return <List component="nav" aria-label="secondary mailbox folder">{listItem}</List>;
  // };

  // function SelectedListItem() {

  //   const listItem = customers.map((item, idx) =>
  //   <ListItemButton key={item.id}
  //     selected={selectedIndex === item.id}
  //     onClick={(event) => handleListItemClick(event, item)}
  //   >
  //     <ListItemText primary={tabIndex == 0 ? (item.name) : (tabIndex == 1 ? (item.email) : (item.date))} />
  //   </ListItemButton>
  //   );

  //   const [items, setItems] = useState(listItem);
  //   const [searched, setSearched] = useState("");
  
  //   const requestSearch = (searchedVal) => {
  //     const filteredItems = listItem.filter((item) => {
  //       return item.toLowerCase().includes(searchedVal.toLowerCase());
  //     });
  //     setItems(filteredItems);
  //   };
  
  //   const cancelSearch = () => {
  //     setSearched("");
  //     requestSearch(searched);
  //   };


    
  //   return (
  //     <Box sx={{ width: '100%', maxwidth: 360, bgcolor: 'background.paper' }}>
  //       <SearchBar
  //         value={searched}
  //         onChange={(searchVal) => requestSearch(searchVal)}
  //         onCancelSearch={() => cancelSearch()}
  //         placeholder="filter"        
  //       />
  //       <List
  //       >
  //         {items.map((item, index) => {
  //           const labelId = `checkbox-list-label-${item}`;

  //           return (
  //             <ListItem
  //               key={item}
  //               role={undefined}
  //               dense
  //               button
  //               divider
  //             >

  //               <ListItemText
  //                 id={labelId}
  //                 primary={item}
  //               />
  //             </ListItem>
  //           );
  //         })}
  //       </List>
  //     </Box>
  //   );
  // }

  // function reRender() {
  //   setSearch(true);
  // }


}