import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import Button from '@mui/material/Button/Button';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import TextField from '@mui/material/TextField/TextField';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { ListItem } from '@mui/material';
import { BasicTabs11, test11 } from './TapPanel';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { createSlice, configureStore } from '@reduxjs/toolkit'

import Stack from '@mui/material/Stack';
import { SaveIcon } from '@mui/icons-material';
import InputForm from './InputForm';
import CancelIcon from '@mui/icons-material/Cancel';

import { click, reset } from './addBtnSlice';
import addBtnStore from './addBtnStore';

let totalElements = 0;
let clickedId = 0;

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


    const isAddBtnClicked = useSelector(state => {
      return state.isAddBtnClicked.value;
    });

    const handleListItemClick = (event, item) => {
      setSelectedIndex(item.id);
      console.log(" ------- handleListItemClick ----------");
      console.log("selectedIndex - " + selectedIndex);
      console.log("item.id - " + item.id);
      clickedId = item.id;
    };

    const selectedList = customers.list.filter((item) => {
      if (userInput === "") return true;
      return (tabIndex == 0 ? (item.korName.toLowerCase().includes(userInput))
        : (tabIndex == 1 ? (item.engName.toLowerCase().includes(userInput)) : (item.engInitName.toLowerCase().includes(userInput))));
    })

    const listItem = selectedList.map((item, idx) =>
      <ListItemButton key={item.id}
        selected={selectedIndex === item.id}
        onClick={(event) => handleListItemClick(event, item)}
        disabled={isAddBtnClicked}
      >
        <ListItemText primary={tabIndex == 0 ? (item.korName) : (tabIndex == 1 ? (item.engName) : (item.engInitName))} />
      </ListItemButton>
    );

    return <List component="nav" aria-label="secondary mailbox folder">{listItem}</List>;
  };

  return (
    <Box sx={{ width: '100%', maxwidth: 360, bgcolor: 'background.paper' }}>
      <SearchItem userInput={userInput} setUserInput={setUserInput} />
      <ListItems />
    </Box>
  );
}


const BoxComponent = (props) => {
  const isNew = props.isNew;
  const customers = props.customers;
  const setCustomers = props.setCustomers;
  const setIsNew = props.setIsNew;
  const setSelectedIndex = props.setSelectedIndex;
  const addBtnDispatch = useDispatch();

  const onAdd = () => {
    if (isNew == false) {
      console.log("index.js - onAdd");
      console.log(customers);

      setCustomers({
        query: "new", list: [...customers.list, {
          id: null,
          name: "New Data",
          korName: "새 데이터",
          engName: "New Data - English Name",
          engInitName: "New Data - English short Name",
          dataTypeId: "varchar",
          length: "255",
          description: "none",
          isNew: true
        }]
      });

      setIsNew(true);
      setSelectedIndex(null);
    }
    // if (addBtnClicked === false)
    //   setAddBtnClicked(true);
    // else
    //   setAddBtnClicked(false);
    // addBtnDispatch({type:'addBtnSlice/click'});
    addBtnDispatch(click());
    console.log("addBtnClicked!!!!!!!!!!  ");
  }

  const onCancel = () => {
    props.fetchCustomers();
    setIsNew(false);
    addBtnDispatch(reset());
    console.log("cancelBtnClicked!!!!!!!!!!  ");
    clickedId = 0;
  }

  return (
    <div>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" startIcon={<PersonAddAltIcon />} onClick={onAdd}>
          Add
        </Button>
        <Button variant="contained" endIcon={<CancelIcon />} onClick={onCancel} >
          Cancel
        </Button>
      </Stack>
    </div>
  );
}

export default function TestPage() {

  const [customers, setCustomers] = useState({ query: '', list: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isNew, setIsNew] = useState(false);

  const [tabIndex, setTabIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const fetchCustomers = async () => {
    try {
      setError(null);
      setCustomers({ query: '', list: null });
      // loading 상태를 true 로 바꿉니다.
      setLoading(true);
      const response = await axios.get(
        'api/domain/getAll', {
        params: {
          "page": 0,
          "size": 16,
          "sort": "string"
        }
      }
      );

      console.log("index ");
      console.log(response.data);

      console.log(response.data.content[0]);
      setCustomers({ query: "", list: response.data.content }); // 데이터는 response.data 안에 들어있습니다.

      totalElements = response.data.totalElements;
      console.log("totalElements ?:" + totalElements);


      let minId = response.data.content[0].id;
      console.log(" After minId -  " + minId);
      setSelectedIndex(minId);
      console.log(" After setSelectedIndex ");
    } catch (e) {
      setError(e);
    }
    setLoading(false);



  };
  console.log(" -----!!!!!------------ ");
  console.log(customers); //??

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    console.log("test");
  }, [tabIndex]);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!customers.list) return null;


  const onChangeTab = (indexNum) => {

    setTabIndex(indexNum);
    console.log("tabIndex value: " + tabIndex);
  };

  const clearIsNew = () => {
    setIsNew(false);
  }

  return (
    <Container maxwidth="sm">
      <Grid container spacing={2}>
        <Provider store={addBtnStore}>
          <Grid xs={4}>

            <BasicTabs11 onChangeTab={onChangeTab} />
            <SelectedListItem customers={customers} setCustomers={setCustomers} tabIndex={tabIndex} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
            <Stack direction="row" spacing={2}>
              <BoxComponent isNew={isNew} setIsNew={setIsNew} customers={customers} setCustomers={setCustomers} setSelectedIndex={setSelectedIndex} fetchCustomers={fetchCustomers} />
            </Stack>

          </Grid>
          <Grid xs={8}>
            <InputForm id={selectedIndex} totalElements={totalElements} isNew={isNew} fetchCustomers={fetchCustomers} clearIsNew={clearIsNew} clickedId={clickedId} />
          </Grid>
        </Provider>
      </Grid>
    </Container>
  )


}