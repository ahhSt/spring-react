import React, { useState, useEffect, useRef } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { ListItemButton, Box, List, ListItemText, Button, ListItem, Stack, TableContainer } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import InputForm from './InputForm';
import { click, reset, setIndex, resetIndex } from './wordSlice';
import ItemList from './ItemList';

let isDataNotExistStatic = false;

const SelectedListItem = (props) => {
  const dataList = props.dataList;
  const [userInput, setUserInput] = useState("");

  return (
    <Box sx={{ width: '100%', maxwidth: 360, bgcolor: 'background.paper' }}>
      <SearchItem userInput={userInput} setUserInput={setUserInput} />
      <ListItems dataList={dataList} userInput={userInput} />

    </Box>
  );
}

const SearchItem = (props) => {
  // MEMO: setUserInput에 상관 없이, SearchItem에서는 전체 화면 렌더링이 안되므로 포커스 유지가 가능한건가?
  const userInput = props.userInput;
  const setUserInput = props.setUserInput;

  console.log("userSearchInput - " + userInput);

  return (
    <form className="d-flex" role="search">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={userInput} onChange={e => setUserInput(e.target.value)} />
    </form>
  )
};

const ListItems = (props) => {
  const dataList = props.dataList;
  const userInput = props.userInput;
  const addBtnDispatch = useDispatch();

  const handleListItemClick = (event, item) => {
    addBtnDispatch(setIndex(item.id));
    console.log(" ------- handleListItemClick ----------");
    console.log("Index just clicked - " + item.id);
  };

  const selectedList = dataList.list.filter((item) => {
    if (userInput === "") return true;
    return ((item.korName.toLowerCase().includes(userInput.toLowerCase())) || (item.engName.toLowerCase().includes(userInput.toLowerCase()))
      || (item.engInitName.toLowerCase().includes(userInput.toLowerCase())));
  })

  return (
    <ItemList items={selectedList} handleListItemClick={handleListItemClick}/>
  );
};


const BoxComponent = (props) => {
  const dataList = props.dataList;
  const setDataList = props.setDataList;
  const addBtnDispatch = useDispatch();

  const isAddBtnClicked = useSelector(state => {
    return state.isAddBtnClickedWord.value;
  });

  useEffect(() => {
    addBtnDispatch(reset());
  }, []);

  useEffect(() => {
    if (isDataNotExistStatic == true) {
      addBtnDispatch(click());
      console.log("    useEffect if (isDataExistStatic == false)");
    }
  }, [isDataNotExistStatic]);


  const onAdd = () => {
    if (isAddBtnClicked == false) {
      setDataList({
        query: "new", list: [...dataList.list, {
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
      addBtnDispatch(setIndex(null));
      addBtnDispatch(click());
    }
  }

  const onCancel = () => {
    props.fetchDataList();
    addBtnDispatch(reset());
    addBtnDispatch(resetIndex());
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
  const [dataList, setDataList] = useState({ query: '', list: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const addBtnDispatch = useDispatch();

  const isAddBtnClicked = useSelector(state => {
    return state.isAddBtnClickedWord.value;
  });
  let totalElements = 0;

  const fetchDataList = async () => {
    try {
      setError(null);
      setDataList({ query: '', list: null });
      // loading 상태를 true 로 바꿉니다.
      setLoading(true);
      const response = await axios.get(
        'api/word/getAll', {
        params: {
          "page": 0,
          "size": 16,
          "sort": "string"
        }
      });

      console.log("11111111111111111");
      console.log("index ");
      console.log(response.data);

      if (response.data.numberOfElements == 0) {
        console.log("response.data.numberOfElements == 0");
        isDataNotExistStatic = true;
        console.log("isDataNotExistStatic: " + isDataNotExistStatic);
        console.log("isAddBtnClicked: " + isDataNotExistStatic);

        if (isAddBtnClicked == false) {
          console.log("222222222222222... 111");

          setDataList({
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
          console.log("222222222222222... 2222");
          addBtnDispatch(reset());
          console.log("222222222222222... 3333");

          addBtnDispatch(setIndex(null));
          console.log("222222222222222... 4444");
        }
      }
      else {
        isDataNotExistStatic = false;
        console.log(response.data.content[0]);
        setDataList({ query: "", list: response.data.content }); // 데이터는 response.data 안에 들어있습니다.

        totalElements = response.data.totalElements;
        console.log("totalElements ?:" + totalElements);

        let minId = response.data.content[0].id;
        console.log(" After minId -  " + minId);
        addBtnDispatch(setIndex(minId));
      }
    } catch (e) {
      setError(e);
      console.log("......1. 11");

    }
    console.log("......1. 22");

    setLoading(false);
  };

  useEffect(() => {
    fetchDataList();
    console.log("..fetchDataList....1. 22");

  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!dataList.list) return null;

  return (
    <Container maxwidth="sm">
      <Grid container spacing={2}>
          <Grid xs={5}>
            <p> </p>
            <SelectedListItem dataList={dataList} setDataList={setDataList}/>
            <p> </p>
            <Stack direction="row" spacing={2}>
              <BoxComponent dataList={dataList} setDataList={setDataList} fetchDataList={fetchDataList} />
            </Stack>
          </Grid>
          <Grid xs={7}>
            <p> </p>
            <InputForm totalElements={totalElements} fetchDataList={fetchDataList} responseData={dataList} isDataExist={!isDataNotExistStatic} />
          </Grid>
      </Grid>
    </Container>
  )
}