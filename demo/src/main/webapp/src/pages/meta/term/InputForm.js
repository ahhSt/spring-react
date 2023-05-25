import React, {useState, useEffect, useRef, forwardRef, useImperativeHandle} from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';


let term = {};
let desc = '';

const InputForm = (props) => {

  const {words, concatWords, domain, selectDomain, saveCallback, selectTermIdx} = props;

  const onSave = () => {
  
    const saveInfo = async () => {
      try{ 
        term = {...term, words, domain, description: desc};
        console.log(term);
        
        let data = { ...term };
        const response = await axios.post(
          '/api/term', 
          data,
          {headers: {"Content-Type": 'application/json; charset=UTF-8'}}
        );

        alert('Saved');

        concatWords([]);
        selectDomain([]);
        saveCallback();
      }
      catch (e) {
        alert('Error');
      }
    }

    if (window.confirm("저장하시겠습니까?")) {
      saveInfo();
    }

  }

  const onDelete = () => {

    const deleteTerm = async () => {
      try {
        const response = await axios.delete(
          '/api/term/'+ selectTermIdx, 
          null,
          {headers: {"Content-Type": 'application/json; charset=UTF-8'}}
        );

        alert('Deleted');

        saveCallback();
      }
      catch (e) {
        alert('Error');
      }
    }

    console.log(selectTermIdx);

    if (window.confirm("삭제하시겠습니까?")) {
      deleteTerm();
    }
    
  }

  const handleOnChange = (event) => {
    desc = event.target.value;
  }

  const concatTxt = (words, domain, key) => {
    let domainName = domain[key] ? '_' + domain[key] : '';
    let termTxt = words.map(u => u[key]).join('_') + domainName;
    term[key] = termTxt;
    return termTxt;
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        상세 정보
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="id"
            name="id"
            label="ID"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            // autoComplete="id"
            variant="filled"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="korName"
            name="korName"
            label="용어명"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            variant="filled"
            value={ concatTxt(words, domain, 'korName') }
            // autoComplete="shipping address-line2"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="engName"
            name="engName"
            label="영문명"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            variant="filled"
            value={ concatTxt(words, domain, 'engName') }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="engInitName"
            name="engInitName"
            label="영문약어명"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            // autoComplete="shipping address-line2"
            variant="filled"
            value={ concatTxt(words, domain, 'engInitName') }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="dataType"
            name="dataType"
            label="데이터타입"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            // autoComplete="shipping address-line2"
            variant="filled"
            value={ domain.dataTypeName || ''}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="length"
            name="Length"
            label="길이"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            // autoComplete="shipping address-line2"
            variant="filled"
            value={ domain.length || ''}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="description"
            name="description"
            label="description"
            fullWidth
            // autoComplete="shipping address-line2"
            variant="standard"
            onChange={handleOnChange}
          />
        </Grid>
        
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
      <Stack direction="row" spacing={2}>
        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={onDelete}>
          Delete
        </Button>
        <Button variant="contained" endIcon={<SaveIcon />} onClick={onSave}>
          Save
        </Button>
      </Stack>
    </React.Fragment>
  );
};

// InputForm.displayName = "InputForm"

export default InputForm;