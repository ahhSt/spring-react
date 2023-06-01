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

    // - Component refactoring -  
    // TODO: props로 받을 공통적인 데이터 정해두기. -> selectedIndex는 redux나 createContext로 빼기... 
    // 1. header 값. 
    // 2. 현시해줄 데이터
    // 3. 테이블 클릭시에 대한 이벤트
    // 4. 테이블 row당 checkBox & button 


    // const classes = useStyles();

    // const header = [...props.header];
    // const items2 = [...props.items];
    const { items, handleListItemClick } = props;

    const [selectedIndex, setSelectedIndex] = useState(null);
    const header = ['한글명', '영문명', '영문 약어명', 'Data Type', '데이터 길이'];

    const onClick = (event, idx) => {
        setSelectedIndex(idx);
    };

    return (
        <>
            <TableContainer sx={{ minHeight: 300, maxHeight: 600 }} component={Paper}>
                <Table sx={{ minWidth: 300 }} size="small" stickyHeader aria-label="sticky table">
                    <TableHead>
                    <TableRow >
                        {header.map((item, idx) => (
                            <TableCell key={idx} align="left">{item}</TableCell>
                        ))}
                            
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