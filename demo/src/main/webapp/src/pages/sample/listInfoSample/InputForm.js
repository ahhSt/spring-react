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

let setIndex;
let newItem;

const InputForm = (props) => {

  const [customerInfo, setCustomerInfo] = useState({});
  const selectedIndex = props.selectedIndex;
  
  console.log('InputFormInputForm');

  const clearInfo = () => {
    console.log('clear Info');
    let newInfo = {id: null, name:"", email:"", date:""};
    setCustomerInfo(newInfo);
  }

  const fetchCustomerInfo = async (idx) => {
    console.log('fetch info : ' + idx);
    // if (idx == "new"){
    //   clearInfo();
    // }
    // else{
      try {
        const response = await axios.get(
            process.env.REACT_APP_API_URL + '/api/customer/' + idx
        );
        console.log("############################response.data");
        console.log(response.data);
        setCustomerInfo(response.data); // 데이터는 response.data 안에 들어있습니다.
      } catch (e) {
        console.log("error"); 
        clearInfo();
      }
    // }
  };

  console.log("selectedIndex : "+ selectedIndex);
  console.log("setIndex : "+ setIndex);

  if (setIndex != selectedIndex) {
    fetchCustomerInfo(selectedIndex);
    setIndex = selectedIndex;
  }

  const onSave = () => {
  
    const saveCustomerInfo = async () => {
      try{
        if (customerInfo.id == null){
          await axios.post(
            process.env.REACT_APP_API_URL + '/api/customer', customerInfo
          )
        }else{
          await axios.put(
            process.env.REACT_APP_API_URL + '/api/customer/'+customerInfo.id, customerInfo
          ) 
        }
           
        alert('Save');
        props.fetchCustomers();
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

  const onDelete = () => {
    const deleteCustomerInfo = async () => {
      try{
        await axios.delete(
          process.env.REACT_APP_API_URL + '/api/customer/'+customerInfo.id
        ) 
        alert('Delete');
        props.fetchCustomers();
      }
      catch (e) {
        alert('Error');
      }
    }

    if(window.confirm("삭제제하시겠습니까?")) {
      deleteCustomerInfo();
    }
  }

  const onChange = (e, field) => {
    let obj = {};
    obj[field] = e.target.value;
    console.log("customerInfo");
    console.log(customerInfo);

    setCustomerInfo({...customerInfo, ...obj});
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
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            // autoComplete="shipping address-line2"
            variant="standard"
            defaultValue="2222"
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