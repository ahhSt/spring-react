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
import CloseIcon from '@mui/icons-material/Close';
import UpdateIcon from '@mui/icons-material/Update';


const DetailInputForm = (props) => {
  const token = localStorage.getItem("accessToken");
  const [customerInfo, setCustomerInfo] = useState({});
  const selectedIndex = props.selectedIndex;
  let isOpened = props.isDetailOpen;
  let setIndex;

  useEffect(() => {
    if (isOpened){
      fetchCustomerInfo(selectedIndex);
      setIndex = selectedIndex;
    }
  }, [isOpened]);

  const fetchCustomerInfo = async (idx) => {
      try {
        if (idx == null)
          return;

        const response = await axios.get(
            process.env.REACT_APP_API_URL + '/api/customer/' + idx,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        setCustomerInfo(response.data); // 데이터는 response.data 안에 들어있습니다.
      } catch (e) {
        console.log("error"); 
        clearInfo();
      }
  };
  
  const clearInfo = () => {
    let newInfo = {id: null, name:"", email:"", date:"", address:""};
    setCustomerInfo(newInfo);
  }

  const onDelete = () => {
    const deleteCustomerInfo = async () => {
      try{
        await axios.delete(
          process.env.REACT_APP_API_URL + '/api/customer/'+customerInfo.id,
          {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          }
        ) 
        alert('Delete');
        // props.fetchCustomers();
        props.onCloseClicked(false);
      }
      catch (e) {
        alert('Error');
      }
    }

    if(window.confirm("삭제하시겠습니까?")) {
      props.setSelectedIndex(null);
      deleteCustomerInfo();
    }
  }

  const onUpdate = () => {
    const updateCustomerInfo = async () => {
      try{
        await axios.put(
          process.env.REACT_APP_API_URL + '/api/customer/'+customerInfo.id, customerInfo,
          {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          }
        ) 
        alert('Update');
        props.fetchCustomers();
        props.onCloseClicked(false);
      }
      catch (e) {
        alert('Error');
      }
    }

    if(window.confirm("수정하시겠습니까?")) {
      props.setSelectedIndex(null);
      updateCustomerInfo();
    }
  }

  const onChange = (e, field) => {
    let obj = {};
    obj[field] = e.target.value;
    setCustomerInfo({...customerInfo, ...obj});
  }

  const sendCloseClicked = () => {
    props.onCloseClicked(true);
    setIndex = null;
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        <div className="ComponentBox">
          Shipping address
          <Button className={`close`} endIcon={<CloseIcon/>} color={'inherit'} onClick={sendCloseClicked}/>
        </div>
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="id"
            name="id"
            label="ID"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            // autoComplete="id"
            variant="standard"
            value={ customerInfo.id || ""}
            onChange={ (e) => {
              onChange(e, "id");
            } }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="Name"
            name="Name"
            label="Name"
            fullWidth
            // autoComplete="name"
            // InputProps={{
            //   // readOnly: true,
            // }}
            variant="standard"
            value={ customerInfo.name || ""}
            onChange={ (e) => {
              onChange(e, "name");
            } }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="email"
            name="email"
            label="E-Mail"
            fullWidth
            // autoComplete="shipping address-line1"
            InputProps={{
              // readOnly: true,
            }}
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
            // InputProps={{
            //   // readOnly: true,
            // }}
            variant="standard"
            value={ customerInfo.address || ""}
            onChange={ (e) => {
              onChange(e, "address");
            } }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            InputProps={{
              // readOnly: true,
            }}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            InputProps={{
              // readOnly: true,
            }}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            InputProps={{
              // readOnly: true,
            }}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            InputProps={{
              // readOnly: true,
            }}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details(Sample)"
          />
        </Grid>
      </Grid>
      <Stack direction="row" spacing={2}>
        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={onDelete}>
          Delete
        </Button>
        <Button variant="contained" startIcon={<UpdateIcon />} onClick={onUpdate}>
          Update
        </Button>
      </Stack>
    </React.Fragment>
  );
};

// InputForm.displayName = "InputForm"

export default DetailInputForm;