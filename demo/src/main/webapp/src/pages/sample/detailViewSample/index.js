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
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemText from '@mui/material/ListItemText';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

import DetailInputForm from './DetailInputForm';
import InsertInputForm from './InsertInputForm';
import Modal from 'react-modal';
import ComponentBox from './Sample.css';

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
  const selectedIndex = props.selectedIndex;
  const setSelectedIndex = props.setSelectedIndex;

  const selectedList = customers.list.filter((item) => {
    if (userInput === "") return true;
    return (item.name == null ? "" : item.name).toLowerCase().includes(userInput);
  })

  const ListItems = () => {

    const handleListItemClick = (event, item) => {
      setSelectedIndex(item.id);
    };

    const handleListItemDbClick = () => {
      props.openDetailModal();
    };

    const listItem = selectedList.map((item, idx) => 
              <ListItemButton key={ item.id }
              selected={selectedIndex === item.id}
              onClick={(event) => handleListItemClick(event, item)}
              onDoubleClick={(event) => handleListItemDbClick(event, item)}
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

export default function TestPage(){

    const [customers, setCustomers] = useState({query:'', list: []});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const closeModal = (isCloseBtn) => {
      setIsOpen(false);

      if (!isCloseBtn){
        fetchCustomers();
      }
    }

    function openModal() {
      setIsOpen(true);
    }
    
    function PopupBtn() {
      return (
        <Box component="span" sx={{ p: 1, border: '1px grey' }}>
          <Button variant="contained" startIcon={<PersonAddAltIcon />} onClick={openModal}>
            Insert Modal
          </Button>
        </Box>
      );
    }

    const closeDetailModal = (isCloseBtn) => {
      setIsDetailOpen(false);
      // fetchCustomers();

      if (!isCloseBtn){
        fetchCustomers();
      }
    }

    function openDetailModal() {
      if (selectedIndex == null){
        alert("하나를 선택해주세용");
        return;
      }
      setIsDetailOpen(true);
    }
  
    function DetailPopupBtn () {
      return (
        <Box component="span" sx={{ p: 1, border: '1px grey' }}>
          <Button variant="contained" startIcon={<PersonAddAltIcon />} onClick={openDetailModal} disabled={(customers.list.length) == 0 ? true : false} >
            Detail Modal
          </Button>
        </Box>
      );
    }

    const onDelete = () => {
      const deleteCustomerInfo = async () => {
        try{
          if (selectedIndex == null){
            alert('하나를 선택해주세용');
            return;
          }

          await axios.delete(
            process.env.REACT_APP_API_URL + '/api/customer/'+ selectedIndex
          ) 
          alert('Delete');
          setSelectedIndex(null);
          fetchCustomers();
        }
        catch (e) {
          alert('Error');
        }
      }
    
      if(window.confirm("삭제하시겠습니까?")) {
        deleteCustomerInfo();
      }
    };

    function DeleteBtn () {
      return (      
      <Box component="span" sx={{ p: 1, border: '1px grey' }}>
        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={onDelete} disabled={(customers.list.length) == 0 ? true : false}>
          Delete
        </Button>
      </Box>);
    }


    const customStyles = {
      overlay :{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor : "rgba(0,0,0,0.5)",
      },
      content: {
        width:'50%',
        height:'70%',
        position: 'absolute',
        top: '20%',
        left: '30%',
        // right: '40px',
        // bottom: '40px',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '20px'
      }

    }

    const fetchCustomers = async () => {
      try {
        setError(null);
        setCustomers({query: "", list: []});
        // loading 상태를 true 로 바꿉니다.
        setLoading(true);
        const response = await axios.get(
            process.env.REACT_APP_API_URL + '/api/customer'
        );

        if (response.data.length == 0 ){
          setLoading(false);
          return;
        }
        setCustomers({query:"", list: response.data}); // 데이터는 response.data 안에 들어있습니다.

        if (selectedIndex == null){
          setSelectedIndex(response.data[0].id);
        }

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

    return (
        <Container maxwidth="sm">
            <Grid container spacing={2}>
                  <SelectedListItem customers={customers} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} openDetailModal={openDetailModal}/>
                  <DeleteBtn />
                  <DetailPopupBtn isDetailOpen={isDetailOpen} setIsDetailOpen={setIsDetailOpen}/>
                  <Modal ariaHideApp={false} isOpen={isDetailOpen} onRequestClose={closeDetailModal} style={customStyles}>
                    <main>
                      <DetailInputForm isDetailOpen={isDetailOpen} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} fetchCustomers={fetchCustomers} onCloseClicked={closeDetailModal} ></DetailInputForm>
                    </main> 
                  </Modal>
                  <PopupBtn isOpen={isOpen} setIsOpen={setIsOpen}/>
                  <Modal ariaHideApp={false} isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
                    <main>
                      <InsertInputForm onCloseClicked={closeModal}></InsertInputForm>
                    </main> 
                  </Modal>
            </Grid>
        </Container>
    )
}