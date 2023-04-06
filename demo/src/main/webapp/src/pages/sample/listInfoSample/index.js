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

import InputForm from './InputForm';

export default function TestPage(){

    const [customers, setCustomers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isNew, setIsNew] = useState(false);
    const [search, setSearch] = useState(false);

    const [selectedIndex, setSelectedIndex] = useState(null);

    const fetchCustomers = async () => {
      try {
        setError(null);
        setCustomers(null);
        // loading 상태를 true 로 바꿉니다.
        setLoading(true);
        const response = await axios.get(
            '/api/customer'
        );
        setCustomers(response.data); // 데이터는 response.data 안에 들어있습니다.

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
    if (!customers) return null;

    const handleListItemClick = (event, item) => {
      console.log(item.isNew);
      setIsNew(item.isNew);
      setSelectedIndex(item.id);
    };

    const ListItems = () => {

      const listItem = customers.map((item, idx) => 
                <ListItemButton key={ item.id }
                selected={selectedIndex === item.id}
                onClick={(event) => handleListItemClick(event, item)}
                >
                <ListItemText primary={ item.name } />
                </ListItemButton>
            );

      return <List component="nav" aria-label="secondary mailbox folder">{ listItem }</List>;
    };

    const onSubmit = (e) => {
      e.preventDefault();
      fetchCustomers();
    }

    const SearchItem = () => {

        return (
            <form className="d-flex" role="search" onSubmit={onSubmit}>
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
        )
    };

    function BoxComponent() {
        return (
          <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>
            <Button>Save</Button>
          </Box>
        );
    }
    
    function Item() {
        return (
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        );
    }

    function onAdd() {
      console.log(customers);
      // const lastCust = customers.reduce( (prev, current) => prev.id > current.id ? prev : current);
      // const newId = lastCust.id + 1;
      setCustomers([...customers, {id: null, name:"New Data", isNew:true}]);
      setIsNew(true);
      setSelectedIndex(null);
    }

    function SelectedListItem() {
      
        return (
          <Box sx={{ width: '100%', maxwidth: 360, bgcolor: 'background.paper' }}>
            <SearchItem />
            <ListItems />
          </Box>
        );
    }

    function reRender () {
      setSearch(true);
    }

    return (
        <Container maxwidth="sm">
            <Grid container spacing={2}>
                <Grid xs={4}>
                  <SelectedListItem />
                  <Button variant="contained" startIcon={<PersonAddAltIcon />} onClick={onAdd}>
                    Add
                  </Button>
                </Grid>
                <Grid xs={8}>
                  <InputForm id={ selectedIndex } isNew= { isNew } fetchCustomers = { fetchCustomers }/>
                </Grid>
            </Grid>
        </Container>
    )
}