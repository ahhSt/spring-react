import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ApiRoundedIcon from '@mui/icons-material/ApiRounded';
import AndroidRoundedIcon from '@mui/icons-material/AndroidRounded';

import { Link, NavLink } from 'react-router-dom';

export const mainListItems = (
  <React.Fragment>
    <Link to="/dashboard">
      <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>
    <Link to="/orders">
      <ListItemButton>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText 
          primary="Orders" />
      </ListItemButton>
    </Link>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Sample Screen
    </ListSubheader>
    <Link to="/list-info">
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="(CRUD) Sample 1" />
      </ListItemButton>
    </Link>
    <Link to="/list-info-JH">
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="(샘플화면)_JH" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

export const thirdListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Meta System
    </ListSubheader>
    <Link to="/word-management">
      <ListItemButton>
        <ListItemIcon>
          <ApiRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="단어관리" />
      </ListItemButton>
    </Link>
    <Link to="/domain-management">
      <ListItemButton>
        <ListItemIcon>
          <AndroidRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="도메인 관리" />
      </ListItemButton>
    </Link>
    <Link to="/term">
      <ListItemButton>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="용어 관리" />
      </ListItemButton>
    </Link>
    <Link to="/testJHv">
      <ListItemButton>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="테스트용 JH Word" />
      </ListItemButton>
    </Link>
    <Link to="/testJH_Domain">
      <ListItemButton>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="테스트용 JH Domain" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);