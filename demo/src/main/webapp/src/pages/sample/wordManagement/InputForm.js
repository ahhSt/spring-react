import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
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

  const [index, setIndex] = useState(props.id);
  const [isNew, setIsNew] = useState(props.isNew);
  const [customerInfo, setCustomerInfo] = useState({});
  const [age, setAge] = useState(''); // TODO: 추후에 DB로 부터 불러온 Resp 값을 set 하는 것으로 수정하기. 

  function clearInfo() {
    setCustomerInfo({ id: index });
  }

  useEffect(() => {
    console.log('222222222');
    setIsNew(props.isNew);
    setIndex(props.id);
  });

  useEffect(() => {
    console.log('useEffect11111');

    const DetailInfo = (idx) => {
      const fetchCustomerInfo = async (idx) => {
        try {
          const response = await axios.get(
            '/api/customer/' + idx
          );
          console.log(response.data);
          setCustomerInfo(response.data); // 데이터는 response.data 안에 들어있습니다.
        } catch (e) {
          console.log("error");
        }
      };

      fetchCustomerInfo(idx);
    }

    if (isNew) {
      clearInfo();
    }
    else {
      DetailInfo(index);
    }
  }, [index]);

  const onSave = () => {
    console.log(customerInfo);

    const saveCustomerInfo = async () => {
      try {
        if (isNew) {
          await axios.post(
            '/api/customer', customerInfo
          )
        }
        else {
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

    if (window.confirm("저장,하시겠습니까?")) {
      saveCustomerInfo();
    }
  }

  const onDelete = () => {
    const deleteCustomerInfo = async () => {
      try {
        await axios.delete(
          '/api/customer/' + customerInfo.id
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
    setAge(event.target.value);
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
        Word Management
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="name_kor"
            name="name_kor"
            label="한글명"
            fullWidth
            // InputProps={{
            //   readOnly: true,
            // }}
            autoComplete="name_kor"
            variant="standard"
            value={customerInfo.name_kor || ""}
            onChange={(e) => {
              onChange(e, "name_kor");
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
            id="name_eng"
            name="name_eng"
            label="영문명"
            fullWidth
            // autoComplete="name"
            variant="standard"
            value={customerInfo.name_eng || ""}
            onChange={(e) => {
              onChange(e, "name_eng");
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="abbreviation_eng"
            name="abbreviation_eng"
            label="영문 약어명"
            fullWidth
            // autoComplete="shipping address-line1"
            variant="standard"
            value={customerInfo.abbreviation_eng || ""}
            onChange={(e) => {
              onChange(e, "abbreviation_eng");
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
            id="explanation"
            name="explanation"
            label="단어 설명"
            fullWidth
            // autoComplete="shipping address-line2"
            variant="standard"
            value={customerInfo.explanation || ""}
            onChange={(e) => {
              onChange(e, "explanation");
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
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
          {/* <TextField
            id="state"
            name="state"
            label="Data Type (To do Change into comboBox)"
            fullWidth
            variant="standard"
          /> */}
          <FormControl fullWidth>
            {/* 아래는 다시한번 확인 필요 */}
            <InputLabel id="demo-simple-select-label">Data type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="data_type"
              name="data_type"
              // value={age}
              value={age}
              label="Data type"
              onChange={handleSelectChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="TBD"
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
            label="TBD"
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