import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import axios from 'axios';

import { Container } from 'react-bootstrap';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

import TermList from './components/TermList';
import InputForm from './components/InputForm';
import { TermProvider } from './providers/TermProvider';
import { theme } from './providers/Theme';

import { SelectedListItem } from './components/SelectedListItem';


export default function Main() {

  const wordHeader = ['단어명', '영문명', '영문약어명'];
  const domainHeader = ['도메인명', '영문명', '영문약어명', '데이터타입', '길이'];

  const [wordData, setWordData] = useState([]);
  const [domainData, setDomainData] = useState([]);
  // const [reload, setReload] = useState([]);
  // const [selectTermIdx, setSelectTermIdx] = useState([]);

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

  return(
      <>
        <TermProvider>
          <ThemeProvider theme={theme}>
            <Container maxwidth="sm">
                <Grid container spacing={1}>
                    <Grid xs={5.5}>
                        <p>용어 목록</p>
                        <TermList header={wordHeader} items={wordData} height={'90%'}/>
                    </Grid>
                    <Grid xs={3.5}>
                        <Container maxwidth="sm">
                            <p>단어</p>
                            {/* <ItemList header={wordHeader} items={wordData} height={300} handleClick={handleClick}/> */}
                            <SelectedListItem header={wordHeader} items={wordData} type="words" arrowButton={true}/>
                        </Container>

                        <Container maxwidth="sm">
                            <p>도메인</p>
                            {/* <ItemList header={domainHeader} items={domainData} height={300} handleClick={domainSelect}/> */}
                            <SelectedListItem header={domainHeader} items={domainData} type="domain" arrowButton={true}/>
                        </Container>
                    </Grid>
                    <Grid xs={3}>
                        <InputForm/>
                    </Grid>
                </Grid>
            </Container>
          </ThemeProvider>
        </TermProvider>
      </>
    )
  }