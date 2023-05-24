import React, { useRef, useState, useEffect } from "react";
import axios from 'axios';

import { Container } from 'react-bootstrap';
import Button from '@mui/material/Button/Button';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

import ItemList from './ItemList';
import TermList from './TermList';
import InputForm from './InputForm';


export default function Main() {

  const wordHeader = ['단어명', '영문명', '영문약어명'];
  const domainHeader = ['도메인명', '영문명', '영문약어명', '데이터타입', '길이'];

  // const wordData = [
  //   {id: 1, 'korName': '카드', 'engName':'Card', 'engInitName':'CRD'},
  //   {id: 2, 'korName': '번호', 'engName':'Number', 'engInitName':'NUM'},
  //   {id: 3, 'korName': '시리얼', 'engName':'Serial', 'engInitName':'SRL'},
  //   {id: 4, 'korName': '등록', 'engName':'Registry', 'engInitName':'REG'},
  //   {id: 5, 'korName': '수정', 'engName':'Update', 'engInitName':'UPD'},
  //   // {'korName': '수정', 'engName':'Update', 'engInitName':'UPD'},
  //   // {'korName': '수정', 'engName':'Update', 'engInitName':'UPD'},
  //   // {'korName': '수정', 'engName':'Update', 'engInitName':'UPD'},
  //   // {'korName': '수정', 'engName':'Update', 'engInitName':'UPD'},
  //   // {'korName': '수정', 'engName':'Update', 'engInitName':'UPD'},
  //   // {'korName': '수정', 'engName':'Update', 'engInitName':'UPD'},
  //   // {'korName': '수정', 'engName':'Update', 'engInitName':'UPD'},
  //   // {'korName': '수정', 'engName':'Update', 'engInitName':'UPD'},
  //   // {'korName': '수정', 'engName':'Update', 'engInitName':'UPD'},
  //   // {'korName': '수정', 'engName':'Update', 'engInitName':'UPD'},
  //   // {'korName': '수정', 'engName':'Update', 'engInitName':'UPD'},
  //   // {'korName': '수정', 'engName':'Update', 'engInitName':'UPD'},
  //   // {'korName': '수정', 'engName':'Update', 'engInitName':'UPD'},
  //   // {'korName': '수정', 'engName':'Update', 'engInitName':'UPD'},
  //   // {'korName': '수정', 'engName':'Update', 'engInitName':'UPD'},
  //   // {'korName': '수정', 'engName':'Update', 'engInitName':'UPD'},
  //   // {'korName': '수정', 'engName':'Update', 'engInitName':'UPD'},
  //   // {'korName': '수정', 'engName':'Update', 'engInitName':'UPD'},
  //   // {'korName': '수정', 'engName':'Update', 'engInitName':'UPD'},
  //   // {'korName': '수정', 'engName':'Update', 'engInitName':'UPD'},
  // ];
  // const domainData = [
  //   {id: 1, 'korName': '번호', 'engName':'Number', 'engInitName':'NUM', 'dataType':'varchar(10)'},
  //   {id: 2, 'korName': '날짜', 'engName':'Date', 'engInitName':'DT', 'dataType':'varchar(8)'},
  //   {id: 3, 'korName': '일시', 'engName':'DateTime', 'engInitName':'DT', 'dataType':'varchar(14)'},
  //   // {'korName': '일시', 'engName':'DateTime', 'engInitName':'DT', 'dataType':'varchar(14)'},
  //   // {'korName': '일시', 'engName':'DateTime', 'engInitName':'DT', 'dataType':'varchar(14)'},
  //   // {'korName': '일시', 'engName':'DateTime', 'engInitName':'DT', 'dataType':'varchar(14)'},
  //   // {'korName': '일시', 'engName':'DateTime', 'engInitName':'DT', 'dataType':'varchar(14)'},
  //   // {'korName': '일시', 'engName':'DateTime', 'engInitName':'DT', 'dataType':'varchar(14)'},
  //   // {'korName': '일시', 'engName':'DateTime', 'engInitName':'DT', 'dataType':'varchar(14)'},
  //   // {'korName': '일시', 'engName':'DateTime', 'engInitName':'DT', 'dataType':'varchar(14)'},
  //   // {'korName': '일시', 'engName':'DateTime', 'engInitName':'DT', 'dataType':'varchar(14)'},
  //   // {'korName': '일시', 'engName':'DateTime', 'engInitName':'DT', 'dataType':'varchar(14)'},
  //   // {'korName': '일시', 'engName':'DateTime', 'engInitName':'DT', 'dataType':'varchar(14)'},
  //   // {'korName': '일시', 'engName':'DateTime', 'engInitName':'DT', 'dataType':'varchar(14)'},
  // ];

  const [words, concatWords] = useState([]);
  const [domain, selectDomain] = useState({});
  const [wordData, setWordData] = useState([]);
  const [domainData, setDomainData] = useState([]);
  const [reload, setReload] = useState([]);


  const fetchDomains = async () => {
    try {
      const response = await axios.get(
        'api/domain/getAll', {
        params: {
          "page": 0,
          "size": 16,
          "sort": "string"
        }
      }
      );
      // console.log(response.data.content);
      setDomainData(response.data.content);

    } catch (e) {
      console.log("error");
    }
  };

  const fetchWords = async () => {
    try {
      const response = await axios.get(
        'api/word/getAll', {
        params: {
          "page": 0,
          "size": 16,
          "sort": "string"
        }
      }
      );

      // console.log(response.data.content);
      setWordData(response.data.content);
    } catch (e) {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchDomains();
    fetchWords();
    console.log(" ------- SelectedListItem rendering!!!!!!!!! ----------");
  }, []);

  
  const handleClick = (event, item) => {
    concatWords([...words, item]);
  }

  const domainSelect = (event, item) => {
    selectDomain(item);
  }

  const saveCallback = () => {
    let toggle = reload === 1 ? 0 : 1;
    setReload(toggle);
  }

  const theme = createTheme({
    components: {
      // Name of the component
      MuiTableCell: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            fontSize: '0.8rem',
            padding: '3px',
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            height: '10px',
          },
        },
      },
      MuiContainer:{
        styleOverrides: {
          root: {
            // Some CSS
            leftMargin: '',
            rightMargin: '',
          },
        },
      },
    }
  });

  return(
      <>
        <ThemeProvider theme={theme}>
          <Container maxwidth="sm">
              <Grid container spacing={1}>
                  <Grid xs={5}>
                      <p>용어 목록</p>
                      <TermList header={wordHeader} items={wordData} height={'100%'} reload={reload}/>
                  </Grid>
                  <Grid xs={4}>
                      <Container maxwidth="sm">
                          <p>단어</p>
                          <ItemList header={wordHeader} items={wordData} height={300} handleClick={handleClick}/>
                      </Container>

                      <Container maxwidth="sm">
                          <p>도메인</p>
                          <ItemList header={domainHeader} items={domainData} height={300} handleClick={domainSelect}/>
                      </Container>
                  </Grid>
                  <Grid xs={3}>
                      <InputForm words={words} concatWords={concatWords} selectDomain={selectDomain} domain={domain} saveCallback={saveCallback}/>
                  </Grid>
              </Grid>
          </Container>
        </ThemeProvider>
      </>
    )
  }