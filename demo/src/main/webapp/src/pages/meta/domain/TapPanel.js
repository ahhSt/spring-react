import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Tabs, Tab, Typography, Box } from '@mui/material';

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export function BasicTabs11(props) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  props.onChangeTab(value); // 부모 컴포넌트에 전달해 줄! tab click시의 인덱스!!! 

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="한글명" {...a11yProps(0)} />
          <Tab label="영문명" {...a11yProps(1)} />
          <Tab label="영문 약어명" {...a11yProps(2)} />
        </Tabs>
      </Box>
    </Box>
    
  );
}
