import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';

// import { makeStyles } from "@material-ui/core/styles";
// import { IconButton, TextField } from "@material-ui/core";
import IconButton from '@mui/material/IconButton';
import DoubleArrowRoundedIcon from '@mui/icons-material/DoubleArrowRounded';

const CIconButton = styled(IconButton, { shouldForwardProp: (prop) => prop })(
  () => ({
    padding: '0 0 0 0',
    background: 'inherit',
    "&:hover": { color: "green" }
  }),
);

export default function DenseTable(props) {

  // const classes = useStyles();

  // const header = [...props.header];
  // const items = [...props.items];
  const {header, items, height, handleClick} = props;

  const [selectedIndex, setSelectedIndex] = useState(null);

  const onClick = (event, idx) => {
    setSelectedIndex(idx);
  };
  
  return (
    <>
      <TableContainer sx={{ minHeight: 300, maxHeight: height }} component={Paper}>
        <Table sx={{ minWidth: 450 }} size="small" stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>{header[0]}</TableCell>
              <TableCell align="left">{header[1]}</TableCell>
              <TableCell align="left">{header[2]}</TableCell>
              { header[3] && <TableCell align="left">{header[3]}</TableCell>}
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, idx) => (
            // {rows.map((row) => (
              <TableRow
                key={idx}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                selected={selectedIndex === idx}
                onClick={(event) => onClick(event, idx)}
              >
                <TableCell component="th" scope="row">
                  {item.korName}
                </TableCell>
                <TableCell align="left">{item.engName}</TableCell>
                <TableCell align="left">{item.engInitName}</TableCell>
                { item.dataType && <TableCell align="left">{item.dataType}</TableCell>}
                <TableCell align="center" onClick={(event) => handleClick(event, item)}>
                  <CIconButton >
                    <DoubleArrowRoundedIcon fontSize="small" />
                  </CIconButton>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}