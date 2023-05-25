import React, { useState, useEffect, useRef } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { ListItemButton, Box, List, ListItemText, Button, ListItem, Stack, TableContainer } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import InputForm from './InputForm';
import { BasicTabs11 } from './TapPanel';
import { click, reset } from './addBtnSlice';
import addBtnStore from './addBtnStore';
import ItemList from './ItemList';
let totalElements = 0;
let clickedId = 0;
let isDataNotExistStatic = false;


const SearchItem = (props) => {
  // MEMO: setUserInput에 상관 없이, SearchItem에서는 전체 화면 렌더링이 안되므로 포커스 유지가 가능한건가?
  const userInput = props.userInput;
  const setUserInput = props.setUserInput;

  console.log("userSearchInput - " + userInput);

  return (
    <form className="d-flex" role="search">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={userInput} onChange={e => setUserInput(e.target.value)} />
      {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
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

    useEffect(() => {
      console.log(" ------- SelectedListItem rendering!!!!!!!!! ----------");
    }, []);

    const isAddBtnClicked = useSelector(state => {
      return state.isAddBtnClicked.value;
    });

    const handleListItemClick = (event, item) => {
      setSelectedIndex(item.id);
      console.log(" ------- handleListItemClick ----------");
      console.log("Index previously clicked on - " + selectedIndex);
      console.log("Index just clicked - " + item.id);
      clickedId = item.id;
    };

    // const selectedList = customers.list.filter((item) => {
    //   if (userInput === "") return true;
    //   return (tabIndex == 0 ? (item.korName.toLowerCase().includes(userInput))
    //     : (tabIndex == 1 ? (item.engName.toLowerCase().includes(userInput)) : (item.engInitName.toLowerCase().includes(userInput))));
    // })


    // const listItem = selectedList.map((item, idx) =>
    //   <ListItemButton key={item.id}
    //     selected={selectedIndex === item.id}
    //     onClick={(event) => handleListItemClick(event, item)}
    //     disabled={isAddBtnClicked}
    //   >
    //     <ListItemText primary={tabIndex == 0 ? (item.korName) : (tabIndex == 1 ? (item.engName) : (item.engInitName))} />
    //   </ListItemButton>
    // );

    // return <List component="nav" aria-label="secondary mailbox folder" sx={{
    //   width: '100%',
    //   bgcolor: 'background.paper',
    //   // position: 'unset',
    //   overflow: 'auto',
    //   maxHeight: 600,
    //   // '& ul': { padding: 0 },
    // }}>{listItem}</List>;

    const selectedList = customers.list.filter((item) => {
      if (userInput === "") return true;
      return ((item.korName.toLowerCase().includes(userInput.toLowerCase())) || (item.engName.toLowerCase().includes(userInput.toLowerCase())) || (item.engInitName.toLowerCase().includes(userInput.toLowerCase())));
    })

    return (
      <ItemList items={selectedList} handleListItemClick={handleListItemClick}/>
    );
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

  const isAddBtnClicked = useSelector(state => {
    return state.isAddBtnClicked.value;
  });

  useEffect(() => {
    addBtnDispatch(reset());
  }, []);

  useEffect(() => {
    if (isDataNotExistStatic == true) {
      addBtnDispatch(click());
      // onAdd();
      console.log("    useEffect if (isDataExistStatic == false)");
    }
  }, [isDataNotExistStatic]);


  const onAdd = () => {
    if (isNew == false) {
      setCustomers({
        query: "new", list: [...customers.list, {
          id: null,
          name: "New Data",
          korName: "새 데이터",
          engName: "New Data - English Name",
          engInitName: "New Data - English short Name",
          data_type: "varchar",
          data_length: "255",
          description: "none",
          isNew: true
        }]
      });

      setIsNew(true);
      setSelectedIndex(null);
    }
    addBtnDispatch(click());
  }

  const onCancel = () => {
    props.fetchCustomers();
    setIsNew(false);
    addBtnDispatch(reset());
    clickedId = 0;
  }

  return (
    <div>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" startIcon={<PersonAddAltIcon />} disabled={isAddBtnClicked || isDataNotExistStatic} onClick={onAdd}>
          Add
        </Button>
        <Button variant="contained" endIcon={<CancelIcon />} disabled={!isAddBtnClicked || isDataNotExistStatic} onClick={onCancel} >
          Cancel
        </Button>
      </Stack>
    </div>
  );
}

export default function MAIN() {
  const [customers, setCustomers] = useState({ query: '', list: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isNew, setIsNew] = useState(false);

  const [tabIndex, setTabIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isDataExist, setIsDataExist] = useState(true);
  // let isDataExist = true;

  const fetchCustomers = async () => {
    try {
      setError(null);
      setCustomers({ query: '', list: null });
      // loading 상태를 true 로 바꿉니다.
      setLoading(true);
      const response = await axios.get(
        'api/word/getAll', {
        params: {
          "page": 0,
          "size": 16,
          "sort": "string"
        }
      }
      );

      console.log("index ");
      console.log(response.data);

      if (response.data.numberOfElements == 0) {
        console.log("response.data.numberOfElements == 0");
        isDataNotExistStatic = true;
        console.log("isDataNotExistStatic: " + isDataNotExistStatic);

        if (isNew == false) {
          setCustomers({
            query: "new", list: [{
              id: null,
              name: "New Data",
              korName: "새 데이터",
              engName: "New Data - English Name",
              engInitName: "New Data - English short Name",
              data_type: "varchar",
              data_length: "255",
              description: "none",
              isNew: true
            }]
          });
          setIsNew(true);
          setSelectedIndex(null);
        }
      }
      else {
        isDataNotExistStatic = false;
        console.log(response.data.content[0]);
        setCustomers({ query: "", list: response.data.content }); // 데이터는 response.data 안에 들어있습니다.

        totalElements = response.data.totalElements;
        console.log("totalElements ?:" + totalElements);

        let minId = response.data.content[0].id;  /// ???????????
        clickedId = response.data.content[0].id;  /// MEMO: 20230525 추가한 솔루션
        console.log(" After minId -  " + minId);
        setSelectedIndex(minId);
        console.log(" After setSelectedIndex ");
      }
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


  if (loading) return <div>로딩중..</div>;
  if (!isDataExist) return <div>DB 데이터가 없습니다.</div>;
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
          <Grid xs={5}>
            {/* <BasicTabs11 onChangeTab={onChangeTab} /> */}
            <p> </p>
            <SelectedListItem customers={customers} setCustomers={setCustomers} tabIndex={tabIndex} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
            <p> </p>
            <Stack direction="row" spacing={2}>
              <BoxComponent isNew={isNew} setIsNew={setIsNew} customers={customers} setCustomers={setCustomers} setSelectedIndex={setSelectedIndex} fetchCustomers={fetchCustomers} />
            </Stack>
          </Grid>
          <Grid xs={7}>
          <p> </p>
            <InputForm id={selectedIndex} totalElements={totalElements} isNew={isNew} fetchCustomers={fetchCustomers} clearIsNew={clearIsNew} clickedId={clickedId} isDataExist={!isDataNotExistStatic} />
          </Grid>
        </Provider>
      </Grid>
    </Container>
  )
}