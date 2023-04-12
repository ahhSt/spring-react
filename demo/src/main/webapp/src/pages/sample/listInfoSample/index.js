import React, { useState, useEffect, useRef, forwardRef } from 'react';
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
import Pagination from '@mui/material/Pagination';

import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

import InputForm from './InputForm';

const SearchBox = (props) => {
  // const onChange = props.handleChange;
  const userInput = props.userInput;
  const setUserInput = props.setUserInput;

  const handleChange = ({target: {value}}) => {
    console.log('handleChange');
    setUserInput(value.toLowerCase());
    // ref.current.focus();
  }

  return (
      <form className="d-flex" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handleChange} />
          <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
  )
};

SearchBox.displayName = "SearchBox";

const SelectedListItem = (props) => {

  console.log('SelectedListItemSelectedListItem');

  const customers = {...props.customers || {query:"", list:[]}};
  const userInput = props.userInput;
  const setUserInput = props.setUserInput;
  const selectedIndex = props.selectedIndex;
  const setSelectedIndex = props.setSelectedIndex;

  const selectedList = customers.list.filter((item) => {
    if (userInput === "") return true;
    return item.name.toLowerCase().includes(userInput);
  })

  const ListItems = (props) => {

    const handleListItemClick = (event, item) => {
      setSelectedIndex(item.id);
    };

    let listItems = props.items;

    const listItem = listItems.map((item, idx) => 
              <ListItemButton key={ item.id }
              selected={selectedIndex === item.id}
              onClick={(event) => handleListItemClick(event, item)}
              >
              <ListItemText primary={ item.name } />
              </ListItemButton>
          );

    return <List component="nav" aria-label="secondary mailbox folder">{ listItem }</List>;
  };
  
  return (
    <Box sx={{ width: '100%', maxwidth: 360, bgcolor: 'background.paper' }}>
      {/* <SearchItem originCustomers={originCustomers} customers={customers} setCustomers={setCustomers}/> */}
      <SearchBox userInput={userInput} setUserInput={setUserInput} />
      {/* <input onChange={handleChange}/> */}
      <ListItems items={selectedList} setSelectId={props.setSelectId} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>
    </Box>
  );
};

SelectedListItem.displayName = "SelectedListItem";

export default function TestPage(){

    const [originCustomers, setOriginCustomers] = useState(null);
    const [customers, setCustomers] = useState({query:'', list: []});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isNew, setIsNew] = useState(false);
    // const [selectId, setSelectId] = useState(null);
    const [userInput, setUserInput] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(null);

    // const nameInput = useRef();

    console.log('first');

    const fetchCustomers = async () => {
      try {
        setError(null);
        setCustomers({query: "", list: null});
        // loading 상태를 true 로 바꿉니다.
        setLoading(true);
        const response = await axios.get(
            '/api/customer'
        );
        setOriginCustomers(response.data); // 데이터는 response.data 안에 들어있습니다.
        setCustomers({query:"", list: response.data}); // 데이터는 response.data 안에 들어있습니다.

        let minId = response.data[0].id;
        // setSelectedIndex(minId);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    useEffect(() => {
        fetchCustomers();
      }, []);

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!customers.list) return null;

    // const handleListItemClick = (event, item) => {
    //   console.log(item.isNew);
    //   setIsNew(item.isNew);
    //   setSelectedIndex(item.id);
    // };

    function BoxComponent() {
        return (
          <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>
            <Button variant="contained" startIcon={<PersonAddAltIcon />} onClick={onAdd}>
              Add
            </Button>
          </Box>
        );
    }

    function onAdd() {
      console.log(customers);
      // const lastCust = customers.reduce( (prev, current) => prev.id > current.id ? prev : current);
      // const newId = lastCust.id + 1;
      setCustomers({query: customers.query, list: [...customers.list, {id: null, name:"New Data", isNew:true}]});
      setIsNew(true);
      // setSelectedIndex(null);
    }

    // const onChange = (e) => {
    //   setUserInput(e.target.value.toLowerCase());
    // }

    return (
        <Container maxwidth="sm">
            <Grid container spacing={2}>
                <Grid xs={4}>
                  <SelectedListItem userInput={userInput} setUserInput={setUserInput} customers={customers} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
                  {/* <SearchBox /> */}
                  {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange= {onChange} /> */}
                  {/* <ListItems items={ searched }/> */}
                  <Pagination count={10} color="primary" />
                  <BoxComponent />
                </Grid>
                <Grid xs={8}>
                  <InputForm selectedIndex={selectedIndex} />
                </Grid>
            </Grid>
        </Container>
    )
}