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
import ComponentBox from './Sample.css';

const InputForm2 = ({onCloseClicked}) => {

  const [customerInfo, setCustomerInfo] = useState({});
  // const selectedIndex = props.selectedIndex;
  let maxIdResult = 0;

  const getMaxId = async () => {
    const response = await axios.get(
      '/api/customer/getMaxId'
    );
    maxIdResult = response.data;
    console.log("maxIdResult - " + maxIdResult);
    let obj = {};
    obj["id"] = ((response.data + 1).toString());

    setCustomerInfo({ ...customerInfo, ...obj });
  };
  
  useEffect(() => {
    console.log(customerInfo);
    getMaxId();
  }, []);


  const sendCloseClicked = () => {
    onCloseClicked();
  };

  const onSave = () => {
  
    const saveCustomerInfo = async () => {
      try{
        await axios.post(
            '/api/customer', customerInfo
          )
        alert('Save');
      }
      catch (e) {
        alert('Error');
      }
    }

    console.log(customerInfo);

    if(window.confirm("저장하시겠습니까?")) {
      saveCustomerInfo();
    }
  }

  const onChange = (e, field) => {
    let obj = {};
    obj[field] = e.target.value;
    setCustomerInfo({...customerInfo, ...obj});
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        <div className="ComponentBox">
          Shipping address
          <button className={`close`} onClick={sendCloseClicked}> &times;</button>
        </div>
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
            value={ customerInfo.id || ""}
            onChange={ (e) => {
              onChange(e, "id");
            } }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Name"
            name="Name"
            label="Name"
            fullWidth
            // autoComplete="name"
            variant="standard"
            value={ customerInfo.name || ""}
            onChange={ (e) => {
              onChange(e, "name");
            } }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="E-Mail"
            fullWidth
            // autoComplete="shipping address-line1"
            variant="standard"
            value={ customerInfo.email || ""}
            onChange={ (e) => {
              onChange(e, "email");
            } }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address"
            name="address"
            label="Address line"
            fullWidth
            // autoComplete="shipping address-line2"
            variant="standard"
            value={ customerInfo.address || ""}
            onChange={ (e) => {
              onChange(e, "address");
            } }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
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
        <Button variant="contained" endIcon={<SaveIcon />} onClick={onSave}>
          Save
        </Button>
      </Stack>
    </React.Fragment>
  );
};

// InputForm.displayName = "InputForm"

export default InputForm2;