import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { MenuItem, FormControl, Select, InputLabel } from '@mui/material'

import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

const InputForm = (props) => {

  let tempReqeustBody;
  let addIndex = props.addIndex;
  console.log("addIndex  :" + addIndex );
  const [index, setIndex] = useState(props.id);
  const [isNew, setIsNew] = useState(props.isNew);
  const [customerInfo, setCustomerInfo] = useState({});
  const [dataType, setDataType] = useState(''); // TODO: 추후에 DB로 부터 불러온 Resp 값을 set 하는 것으로 수정하기. 

  function clearInfo() {
    setCustomerInfo({ id: index, korName: "", engName:"", engInitName:"", description:"" });
  }

  useEffect(() => {
    console.log('InputForm - 222222222');
    setIsNew(props.isNew);
    setIndex(props.id);
  });

  useEffect(() => {
    console.log('InputForm - useEffect11111');

    const DetailInfo = (idx) => {
      const fetchCustomerInfo = async (idx) => {
        try {
          // const response = await axios.get(
          //   '/api/customer/' + idx
          // );
          const response = await axios.get(
            'api/word/getAll', { params: {"page": 0,
                                          "size": 16,
                                          "sort": "string"}}
          );
          console.log("InputForm - ");
          console.log(response.data);
          console.log("idx - " + idx);
          console.log(response.data.content[Number(idx) - 1]);

     
          setCustomerInfo(response.data.content[Number(idx) - 1]); // 데이터는 response.data 안에 들어있습니다.
          
        } catch (e) {
          console.log("error");
        }
      };

      fetchCustomerInfo(idx);
     
    }

    if (isNew) {
      clearInfo();

      console.log("InputForm.js - clearInfo ");
    }
    else {
      DetailInfo(index);
    }
  }, [index]);



    
  const saveCustomerInfo = async () => {
    try {
      if (isNew) {
        console.log("saveCustomerInfo");
        console.log(customerInfo);
        const res = await axios.post(
          '/api/word/insert', tempReqeustBody
        )
        console.log("res");
        console.log(res);
        props.clearIsNew();
      }
      else {
        console.log("putput ");
        await axios.put(
          '/api/customer/' + customerInfo.id, customerInfo
        )
      }
      alert('Save');
      props.fetchCustomers();
    }
    catch (e) {
      alert('Error');
    }
  }

  const tempsss = () =>{
    let obj = {};
    obj["id"] = (Number(addIndex) + 1).toString();
    console.log("...customerInfo, ...obj");
    console.log({...customerInfo, ...obj});

    tempReqeustBody = {...customerInfo, ...obj};

    console.log("tempReqeustBody");
    console.log(tempReqeustBody);

    setCustomerInfo(() => {
      return {...customerInfo, ...obj}});
    console.log(customerInfo);
  }

  const onSave = () => {
    console.log(customerInfo);
    tempsss();

    if (window.confirm("저장하시겠습니까?")) {
      saveCustomerInfo();
    }
  }

  const onDelete = () => {
    const deleteCustomerInfo = async () => {
      try {
        await axios.delete(
          '/api/word/' + customerInfo.id
        )
        alert('Delete');
        props.fetchCustomers();
      }
      catch (e) {
        alert('Error');
      }
    }

    if (window.confirm("삭제하시겠습니까?")) {
      deleteCustomerInfo();
    }
  }

  const handleSelectChange = (event) => {
    setDataType(event.target.value);
  };


  const onChange = (e, field) => {
    let obj = {};
    obj[field] = e.target.value;
    console.log(customerInfo);

    setCustomerInfo({ ...customerInfo, ...obj });
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        단어 관리 화면 - Word Management
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="korName"
            name="korName"
            label="한글명"
            fullWidth
            // InputProps={{
            //   readOnly: true,
            // }}
            // autoComplete="korName"
            variant="standard"
            value={customerInfo.korName || ""}
            onChange={(e) => {
              onChange(e, "korName");
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        </Grid>
        {/* <Grid item xs={12} sm={6}>
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
        </Grid> */}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="engName"
            name="engName"
            label="영문명"
            fullWidth
            // autoComplete="name"
            variant="standard"
            value={customerInfo.engName || ""}
            onChange={(e) => {
              onChange(e, "engName");
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="engInitName"
            name="engInitName"
            label="영문 약어명"
            fullWidth
            // autoComplete="shipping address-line1"
            variant="standard"
            value={customerInfo.engInitName || ""}
            onChange={(e) => {
              onChange(e, "engInitName");
            }}
          />
        </Grid>
        {/* <Grid item xs={12} sm={6}> */}
          {/* <TextField
            required
            id="tbd1"
            name="tbd1"
            label="TBD"
            fullWidth
            // autoComplete="shipping address-line1"
            variant="standard"
            value={customerInfo.tbd1 || ""}
            onChange={(e) => {
              onChange(e, "tbd1");
            }}
          /> */}
        {/* </Grid> */}
        <Grid item xs={12}>
          <TextField
            required
            id="description"
            name="description"
            label="단어 설명"
            fullWidth
            // autoComplete="shipping address-line2"
            variant="standard"
            value={customerInfo.description || ""}
            onChange={(e) => {
              onChange(e, "description");
            }}
          />
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <TextField
            required
            id="data_length"
            name="data_length"
            label="데이터 길이(숫자만 입력) "
            fullWidth
            autoComplete="standard"
            variant="standard"
            value={customerInfo.data_length || ""}
            onChange={(e) => {
              onChange(e, "data_length");
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Data type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="data_type"
              name="data_type"
              value={dataType}
              label="Data type"
              onChange={handleSelectChange}
            >
              <MenuItem value={"varchar"}>varchar</MenuItem>
              <MenuItem value={"int"}>int</MenuItem>
              <MenuItem value={"timestamp"}>timestamp</MenuItem>
            </Select>
          </FormControl>
        </Grid> */}
        <Grid item xs={12} sm={6}>
          <TextField
            // required
            id="zip"
            name="zip"
            label="TBD"
            fullWidth
            // autoComplete="shipping postal-code"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            // required
            id="country"
            name="country"
            label="TBD"
            fullWidth
            // autoComplete="shipping country"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          {/* <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          /> */}
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