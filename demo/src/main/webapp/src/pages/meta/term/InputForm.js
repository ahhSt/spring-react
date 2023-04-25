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

const InputForm = (props) => {

  const {wordItem, domain} = props;
  const [term, setTerm] = useState({});

  const onSave = () => {
  
    const saveInfo = async () => {
      try{ 
        console.log(wordItem);
        console.log(domain);
        console.log(term);
        alert('Save');
      }
      catch (e) {
        alert('Error');
      }
    }

    saveInfo();
  }

  const onDelete = () => {
    alert('delete');
  }

  const concatTxt = (wordItem, domain, key) => {
    let domainName = domain[key] ? '_' + domain[key] : '';
    let termTxt = wordItem.map(u => u[key]).join('_') + domainName;
    let obj = {};
    obj[key] = termTxt;
    setTerm(...term, ...obj);
    return termTxt;
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
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
        <Grid item xs={11}>
          <TextField
            id="korName"
            name="korName"
            label="용어명"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            variant="filled"
            value={ concatTxt(wordItem, domain, 'korName') }
            // autoComplete="shipping address-line2"
          />
        </Grid>
        <Grid item xs={11}>
          <TextField
            id="engName"
            name="engName"
            label="영문명"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            variant="filled"
            value={ concatTxt(wordItem, domain, 'engName') }
          />
        </Grid>
        <Grid item xs={11}>
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
            value={ concatTxt(wordItem, domain, 'engInitName') }
          />
        </Grid>
        <Grid item xs={11}>
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
            value={ domain.dataType || ''}
          />
        </Grid>

        <Grid item xs={11}>
          <TextField
            id="description"
            name="description"
            label="description"
            fullWidth
            // autoComplete="shipping address-line2"
            variant="standard"
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