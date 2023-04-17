// import React, { useState } from "react";
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

// export default function TapPanels (props) {
//   const [index, setIndex] = useState(0);
//   return (
//     <div>
//       <Tabs selectedIndex={index} onSelect={index => setIndex(index)}>
//         <TabList>
//           <Tab>
//             <span>TAB1</span>
//           </Tab>
//           <Tab>
//             <span>TAB2</span>
//           </Tab>
//           <Tab>
//             <span>TAB3</span>
//           </Tab>
//         </TabList>
//         <div>now is {index}</div>
//         <TabPanel>
//           <div>IM ONE</div>
//         </TabPanel>
//         <TabPanel>
//           <div>IM TWO</div>
//         </TabPanel>
//         <TabPanel>
//           <div>IM THREE</div>
//         </TabPanel>
//       </Tabs>
//     </div>
//   );
// }







import React, { Component } from 'react';
// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { AppBar, Tabs, Tab, Typography, Box } from '@mui/material';


const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  // const listItemss = props.selectedListItem();

  // return (
  //   <div
  //     role="tabpanel"
  //     hidden={value !== index}
  //     id={`simple-tabpanel-${index}`}
  //     aria-labelledby={`simple-tab-${index}`}
  //     {...other}
  //   >
  //     {value === index && (
  //       <Box sx={{ p: 3 }}>
  //         <Typography>{children}</Typography>
  //       </Box>
  //     )}
  //   </div>
  // );

  return (

    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

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
      {/* <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel> */}
    </Box>
    
  );
}
