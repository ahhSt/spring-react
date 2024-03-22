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
  const userInput = props.userInput;
  const setUserInput = props.setUserInput;

  const handleChange = ({target: {value}}) => {
    setUserInput(value.toLowerCase());
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

  const [userInput, setUserInput] = useState('');
  const customers = {...props.customers || {query:"", list:[]}};
  // const userInput = props.userInput;
  // const setUserInput = props.setUserInput;
  const selectedIndex = props.selectedIndex;
  const setSelectedIndex = props.setSelectedIndex;

  const selectedList = customers.list.filter((item) => {
    if (userInput === "") return true;
    return item.name.toLowerCase().includes(userInput);
  })

  const ListItems = () => {

    const handleListItemClick = (event, item) => {
      setSelectedIndex(item.id);
    };

    const listItem = selectedList.map((item, idx) => 
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
      <SearchBox userInput={userInput} setUserInput={setUserInput} />
      <ListItems />
      {/* <ListItems items={selectedList} setSelectId={props.setSelectId} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/> */}
    </Box>
  );
};

SelectedListItem.displayName = "SelectedListItem";

function BoxComponent(props) {

  const setSelectedIndex = props.setSelectedIndex;
  const customers = props.customers;
  const setCustomers = props.setCustomers;

  function onAdd() {
    // const lastCust = customers.reduce( (prev, current) => prev.id > current.id ? prev : current);
    // const newId = lastCust.id + 1;
    setCustomers({query: "new", list: [...customers.list, {id: "new", name:"New Data", isNew:true}]});
    setSelectedIndex("new");
  }

  return (
    <Box component="div" sx={{ p: 2, border: '1px grey' }}>
      <Button variant="contained" startIcon={<PersonAddAltIcon />} onClick={onAdd}>
        Add
      </Button>
    </Box>
  );
}

export default function TestPage(){

    const [customers, setCustomers] = useState({query:'', list: []});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);

    console.log('first');

    const fetchCustomers = async () => {
      try {
        setError(null);
        setCustomers({query: "", list: []});
        // loading 상태를 true 로 바꿉니다.
        setLoading(true);

        const token = localStorage.getItem("accessToken");
        const url = process.env.REACT_BACK_END;
        console.log(url);
        const response = await axios.get(
            process.env.REACT_APP_API_URL + '/mybatis/customer',{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
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

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!customers.list) return null;

    // const onChange = (e) => {
    //   setUserInput(e.target.value.toLowerCase());
    // }

    return (
        <Container maxwidth="sm">
            <Grid container spacing={2}>
                <Grid xs={4}>
                  <SelectedListItem customers={customers} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
                  {/* <SelectedListItem userInput={userInput} setUserInput={setUserInput} customers={customers} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} /> */}
                  {/* <SearchBox /> */}
                  {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange= {onChange} /> */}
                  {/* <ListItems items={ searched }/> */}
                  <Pagination count={10} color="primary" />
                  <BoxComponent customers={customers} setCustomers={setCustomers} setSelectedIndex={setSelectedIndex}/>
                </Grid>
                <Grid xs={8}>
                  <InputForm selectedIndex={selectedIndex} fetchCustomers={fetchCustomers}/>
                </Grid>
            </Grid>
        </Container>
    )
}