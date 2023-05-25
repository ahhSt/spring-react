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
import IconButton from '@mui/material/IconButton';

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
    const { items, handleListItemClick } = props;

    const [selectedIndex, setSelectedIndex] = useState(null);

    const onClick = (event, idx) => {
        setSelectedIndex(idx);
    };

    return (
        <>
            <TableContainer sx={{ minHeight: 300, maxHeight: 600 }} component={Paper}>
                <Table sx={{ minWidth: 300 }} size="small" stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>{"한글명"}</TableCell>
                            <TableCell align="left">{"영문명"}</TableCell>
                            <TableCell align="left">{"영문 약어명"}</TableCell>
                            {/* {"4번" && <TableCell align="left">{"4번"}</TableCell>} */}
                            {/* {"5번" && <TableCell align="left">{"5번"}</TableCell>} */}
                            {/* <TableCell align="center"></TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item, idx) => (
                            // {rows.map((row) => (
                            <TableRow
                                key={idx}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                selected={selectedIndex === idx}
                                onClick={(event) => handleListItemClick(event, item)}
                            >
                                <TableCell component="th" scope="row">
                                    {item.korName}
                                </TableCell>
                                <TableCell align="left">{item.engName}</TableCell>
                                <TableCell align="left">{item.engInitName}</TableCell>
                                {item.dataTypeName && <TableCell align="left">{item.dataTypeName}</TableCell>}
                                {item.dataTypeName && <TableCell align="left">{item.length}</TableCell>}
                                {/* <TableCell align="center" > */}
                                {/* <TableCell align="center" onClick={(event) => handleListItemClick(event, item)}> */}
                                    {/* <CIconButton > */}
                                        {/* <DoubleArrowRoundedIcon fontSize="small" /> */}
                                    {/* </CIconButton> */}
                                {/* </TableCell> */}

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}