import React, { useState, useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import IconButton from '@mui/material/IconButton';
import DoubleArrowRoundedIcon from '@mui/icons-material/DoubleArrowRounded';
import { TermContext } from './TermProvider';

const CIconButton = styled(IconButton, { shouldForwardProp: (prop) => prop })(
    () => ({
        padding: '0 0 0 0',
        background: 'inherit',
        "&:hover": { color: "green" }
    }),
);

export default function DenseTable(props) {

    const {arrowButton, words, concatWords, domain, selectDomain} = useContext( TermContext );

    const {header, items, height, type} = props;

    const [selectedIndex, setSelectedIndex] = useState(null);

    const handleListItemClick = (event, item) => {
        setSelectedIndex(item.id);
    };

    const arrowHandleClick = (event, item) => {
        type === "words" ? concatWords([...words, item]) : selectDomain(item);
    };

    return (
        <>
            <TableContainer sx={{ minHeight: 300, maxHeight: 600 }} component={Paper}>
                <Table sx={{ minWidth: 300 }} size="small" stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {header.map((item, idx) => (
                                <TableCell key={idx} align="left">{item}</TableCell>
                            ))}
                            {arrowButton && <TableCell align="center"></TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item, idx) => (
                            // {rows.map((row) => (
                            <TableRow
                                key={item.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                selected={selectedIndex === item.id}
                                onClick={(event) => handleListItemClick(event, item)}
                            >
                                <TableCell component="th" scope="row">
                                    {item.korName}
                                </TableCell>
                                <TableCell align="left">{item.engName}</TableCell>
                                <TableCell align="left">{item.engInitName}</TableCell>
                                {item.dataTypeName && <TableCell align="left">{item.dataTypeName}</TableCell>}
                                {item.dataTypeName && <TableCell align="left">{item.length}</TableCell>}
                                {arrowButton && 
                                    <TableCell align="center" onClick={(event) => arrowHandleClick(event, item)}>
                                        <CIconButton >
                                            <DoubleArrowRoundedIcon fontSize="small" />
                                        </CIconButton>
                                    </TableCell>
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}