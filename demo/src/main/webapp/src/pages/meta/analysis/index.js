import React, {useState } from "react";
import axios from 'axios';
import { Container } from 'react-bootstrap';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

export default function page() {

  const [dbmsType, setDbmsType] = useState('');
  const [connInfo, setConnInfo] = useState({
    "host" : "jdbc:postgresql://172.20.30.177:5432/bart_db",
    "schema": "afc_main",
    "user" : "afc_main",
    "password" : "afc_main!234"
  });

  const handleChange = (event) => {
    setDbmsType(event.target.value);

    let obj = {};
    obj["dbmsType"] = event.target.value;
    setConnInfo({...connInfo, ...obj})
  };

  const onChange = (e, field) => {
    let obj = {};
    obj[field] = e.target.value;
    setConnInfo({...connInfo, ...obj})
  }

  const onclick = (e) => {
    console.log(connInfo);

    const saveInfo = async () => {
      try{ 
        let data = {...connInfo};
        
        const response = await axios.post(
          '/api/gap/metadata', 
          data,
          {headers: {"Content-Type": 'application/json; charset=UTF-8'}}
        );

        alert('Saved');
      }
      catch (e) {
        alert('Error');
      }
    }

    if (window.confirm("저장하시겠습니까?")) {
      saveInfo();
    }
  }

  return (
    <> 
      <Container maxwidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField 
              id="dbname" 
              label="DB Name" 
              variant="standard" 
              sx={{ m: 1, width: '25ch' }}
              value={connInfo.dbname || ""} 
              onChange={(e) => { 
                onChange(e, "dbname"); 
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="medium">
              <InputLabel id="demo-select-large-label">DBMS Driver</InputLabel>
              <Select
                labelId="demo-select-large-label"
                id="demo-select-large"
                sx={{ m: 0, width: '50ch' }}
                value={dbmsType}
                label="DBMS Type"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={'postgres'}>Postgresql</MenuItem>
                <MenuItem value={'oracle'}>Oracle</MenuItem>
                <MenuItem value={'mysql'}>MySql</MenuItem>
                <MenuItem value={'mssql'}>MS Sqlserver</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField 
              id="host" 
              label="Connection URL" 
              variant="standard" 
              sx={{ m: 1, width: '60ch' }}
              value={connInfo.host || "jdbc:postgresql://172.20.30.177:5432/bart_db"}
              onChange={(e) => { 
                onChange(e, "host"); 
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              id="schema" 
              label="Schema" 
              variant="standard" 
              sx={{ m: 1, width: '25ch' }}
              value={connInfo.schema || "afc_main"}
              onChange={(e) => { 
                onChange(e, "schema"); 
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              id="user" 
              label="User" 
              variant="standard" 
              sx={{ m: 1, width: '25ch' }}
              value={connInfo.user || "afc_main"}
              onChange={(e) => { 
                onChange(e, "user"); 
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              id="password" 
              label="Password" 
              type="password"
              variant="standard" 
              sx={{ m: 1, width: '25ch' }}
              value={connInfo.password || "afc_main!234"}
              onChange={(e) => { 
                onChange(e, "password"); 
              }}
            />
          </Grid>
          
          <Grid item xs={12}>
          <Button variant="contained" onClick={(e) => {onclick(e);}}>Meta 정보 수집</Button>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}


