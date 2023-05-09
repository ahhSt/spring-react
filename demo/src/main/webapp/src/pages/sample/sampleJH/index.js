import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import Button from '@mui/material/Button';
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
import DeleteIcon from '@mui/icons-material/Delete';
import InputForm from './InputForm';
import AddIcon from '@mui/icons-material/Add';

export default function TestPage(){

    const [customers, setCustomers] = useState(null);
    // const [customerInfo, setCustomerInfo] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [selectedIndex, setSelectedIndex] = useState(1);

    // const DetailInfo = (idx) =>{
    //   const fetchCustomerInfo = async (idx) => {
    //     try {
    //       const response = await axios.get(
    //           '/api/customer/' + idx
    //       );
    //       setCustomerInfo(response.data); // 데이터는 response.data 안에 들어있습니다.
    //     } catch (e) {
    //       console.log("error");
    //     }
    //   };
  
    //   fetchCustomerInfo(idx);
    // }

    useEffect(() => {
        console.log("parent useeffect");
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
          } catch (e) {
            setError(e);
          }
          setLoading(false);
        };
    
        fetchCustomers();
        // DetailInfo(1);
      }, []);

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!customers) return null;

    const handleListItemClick = (event, index) => {
      setSelectedIndex(index);
      // console.log(index);
      // DetailInfo(index);
    };

    const ListItems = () => {

      const listItem = customers.map((item, idx) => 
                <ListItemButton key={ item.id }
                selected={selectedIndex === item.id}
                onClick={(event) => handleListItemClick(event, item.id)}
                >
                <ListItemText primary={ item.name } />
                </ListItemButton>
            );

      return <List component="nav" aria-label="secondary mailbox folder">{ listItem }</List>;
    };

    const SearchItem = () => {

        return (
            <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
        )
    };


    const clickAddBtn = () => {
      setCustomers([...customers, {id: null, name:"New Data", isNew:true}]);
      
      console.log(customers);
    }


    const AddButton = () => {

      return (
        <Grid container spacing={3}>
          <Grid xs={9}>
          </Grid>
          <Grid xs={3}>
          <Button variant="outlined" startIcon={<AddIcon />} onClick={clickAddBtn}>
             New
          </Button>
        </Grid>
        </Grid>
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

    function SelectedListItem() {
      
        return (
          <Box sx={{ width: '100%', maxwidth: 360, bgcolor: 'background.paper' }}>
            <SearchItem />
            <ListItems />
          </Box>
        );
    }

    return (
        <Container maxwidth="sm">
            <Grid container spacing={2}>
                <Grid xs={4}>
                    <SelectedListItem />
                    <AddButton />
                </Grid>
                <Grid xs={8}>
                    <InputForm id={ selectedIndex } />
                </Grid>
            </Grid>
        </Container>
    )
}