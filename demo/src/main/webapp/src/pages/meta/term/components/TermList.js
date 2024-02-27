import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

// import { makeStyles } from "@material-ui/core/styles";
// import { IconButton, TextField } from "@material-ui/core";
import IconButton from '@mui/material/IconButton';

import { TermContext } from '../providers/TermProvider';

const CIconButton = styled(IconButton, { shouldForwardProp: (prop) => prop })(
  () => ({
    padding: '0 0 0 0',
    background: 'inherit',
    "&:hover": { color: "green" }
  }),
);

const SearchItem = (props) => {
  const {userInput, setUserInput} = props;

  return (
    <form className="d-flex" role="search">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={userInput} onChange={e => setUserInput(e.target.value)} />
      <button className="btn btn-outline-success" type="submit">Search</button>
    </form>
  )
};

export default function DenseTable(props) {
  const {reload, setSelectedTerm, setSelectTermIdx} = useContext(TermContext);
  const {height} = props;

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [terms, setTerms] = useState([]);
  const [userInput, setUserInput] = useState("");

  const fetchTerms = async () => {
    try {
      const response = await axios.get(
        '/api/term'
      );

      console.log(response.data.content);
      setTerms(response.data.content);
    } catch (e) {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchTerms();
  }, []);

  useEffect(() => {
    fetchTerms();
  }, [reload]);

  const selectTerm = (idx) => {
    setSelectTermIdx(idx);
  }

  const onClick = (event, idx) => {
    setSelectedIndex(idx);
    let termId = termList[idx].id;
    selectTerm(termId);
    console.log(termList[idx]);
    setSelectedTerm((obj) => termList[idx]);
  };

  const termList = terms.filter((item) => {
    if (userInput === "") return true;
    return item.korName.toLowerCase().includes(userInput) || (item.engName.toLowerCase().includes(userInput)) || (item.engInitName.toLowerCase().includes(userInput));
  })
  
  return (
    <>
      <SearchItem userInput={userInput} setUserInput={setUserInput}/>
      <TableContainer sx={{ minHeight: 300, height: height}} component={Paper}>
        <Table sx={{ minWidth: 500 }} size="medium" stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>ID.</TableCell>
              <TableCell>용어한글명</TableCell>
              <TableCell align="left">용어명</TableCell>
              <TableCell align="left">용어축약명</TableCell>
              <TableCell align="left">데이터타입</TableCell>
              <TableCell align="left">길이</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {termList.map((item, idx) => (
            // {rows.map((row) => (
              <TableRow
                key={idx}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                selected={selectedIndex === idx}
                onClick={(event) => onClick(event, idx)}
              >
                <TableCell align="left">{item.id}</TableCell>
                <TableCell component="th" scope="row">
                  {item.korName}
                </TableCell>
                <TableCell align="left">{item.engName}</TableCell>
                <TableCell align="left">{item.engInitName}</TableCell>
                <TableCell align="left">{item.type}</TableCell>
                <TableCell align="left">{item.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}