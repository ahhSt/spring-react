import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

// import { makeStyles } from "@material-ui/core/styles";
// import { IconButton, TextField } from "@material-ui/core";
import IconButton from '@mui/material/IconButton';
import DoubleArrowRoundedIcon from '@mui/icons-material/DoubleArrowRounded';
import { ThemeProvider } from 'styled-components';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const buttonClass = {
  padding: "0px",
}

export default function DenseTable(props) {

  // const classes = useStyles();

  // const header = [...props.header];
  // const items = [...props.items];
  const {header, items} = props;

  const theme = createTheme({
    components: {
      // Name of the component
      MuiIconButton: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            fontSize: '1rem',
            padding: '0 0 0 0',
            background: '#EFD26E',
            "&:hover": {
              backgroundColor: "green"
            }
          },
        },
      },
    },
  });

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 450 }} size="small" aria-label="a dense table">
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
              >
                <TableCell component="th" scope="row">
                  {item.korName}
                </TableCell>
                <TableCell align="left">{item.engName}</TableCell>
                <TableCell align="left">{item.engInitName}</TableCell>
                { item.dataType && <TableCell align="left">{item.dataType}</TableCell>}
                <TableCell align="center">
                  <ThemeProvider theme={theme}>
                    <IconButton color="inherit" size="small">
                      <DoubleArrowRoundedIcon fontSize="small"/>
                    </IconButton>
                  </ThemeProvider>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}