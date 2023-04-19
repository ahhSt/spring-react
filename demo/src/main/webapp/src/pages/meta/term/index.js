import React, { useRef, useState, useEffect } from "react";

import { Container } from 'react-bootstrap';
import Button from '@mui/material/Button/Button';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';

import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

import ItemList from './ItemList';
import InputForm from './InputForm';


export default function Main() {

  const wordHeader = ['단어명', '영문명', '영문약어명'];
  const domainHeader = ['도메인명', '영문명', '영문약어명', '데이터타입'];

  const wordData = [
    {'korName': '카드', 'engName':'Card', 'engInitName':'CRD'},
    {'korName': '번호', 'engName':'Numbeer', 'engInitName':'NUM'},
    {'korName': '시리얼', 'engName':'Serial', 'engInitName':'SRL'},
    {'korName': '등록', 'engName':'Registry', 'engInitName':'REG'},
    {'korName': '수정', 'engName':'Update', 'engInitName':'UPD'},
  ];
  const domainData = [
    {'korName': '번호', 'engName':'Numbeer', 'engInitName':'NUM', 'dataType':'varchar(10)'},
    {'korName': '날짜', 'engName':'Date', 'engInitName':'DT', 'dataType':'varchar(8)'},
    {'korName': '일시', 'engName':'DateTime', 'engInitName':'DT', 'dataType':'varchar(14)'},
  ];


  return(
        <Container maxwidth="sm">
            <Grid container spacing={2}>
                <Grid xs={5}>
                    <Container maxwidth="sm" minheight="1600">
                        <p>단어</p>
                        <ItemList header={wordHeader} items={wordData}/>
                    </Container>

                    <Container maxwidth="sm" minheight="800">
                        <p>도메인</p>
                        <ItemList header={domainHeader} items={domainData}/>
                    </Container>
                </Grid>
                <Grid xs={7}>
                    <InputForm />
                </Grid>
            </Grid>
        </Container>
    )
  }