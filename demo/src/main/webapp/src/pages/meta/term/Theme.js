
import React from "react";
import {styled, createTheme} from '@mui/material/styles';

export const theme = createTheme({
    components: {
        // Name of the component
        MuiTableCell: {
        styleOverrides: {
            // Name of the slot
            root: {
            // Some CSS
            fontSize: '0.7rem',
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