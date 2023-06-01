import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { MenuItem, FormControl, Select, InputLabel, Stack, Button, TextField, Typography, Grid } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { reset, click, resetIndex, setIndex } from './domainSlice';

const InputForm = (props) => {
  let tempReqeustBody;
  let totalElements = props.totalElements;
  const responseData = props.responseData;
  const isDataExist = props.isDataExist;
  const [customerInfo, setCustomerInfo] = useState({});
  const addBtnDispatch = useDispatch();
  
  const isAddBtnClicked = useSelector(state => {
    return state.isAddBtnClicked.value;
  });

  const clickedIndexNum = useSelector(state => {
    return state.clickedIndexNum.value;
  });

  function clearInfo() {
    setCustomerInfo({ id: null, korName: "", engName: "", engInitName: "", description: "", dataTypeId: "", length: "", dataTypeName: "", });
  }

  const getClickedIndexData = (respData, clickedDataID) => {
    let testObj = respData.list;
    let isFindClickedId = false;
    for (let arrObj of respData.list) {
      if (arrObj.id == (Number(clickedDataID))) {
        console.log(" ↓↓↓↓↓↓↓↓↓↓↓↓↓  Filtering the only clicked index data from the getAll API response data ↓↓↓↓↓↓↓↓↓↓↓↓↓ ");
        console.log(arrObj);
        console.log(" ↑↑↑↑↑↑↑↑↑↑↑↑↑  Filtering the only clicked index data from the getAll API response data ↑↑↑↑↑↑↑↑↑↑↑↑↑ ");
        testObj = arrObj;
        isFindClickedId = true;
      }
    }
    if (isFindClickedId)
      return testObj;
    else {
      return respData.list[0];
    }
  }

  useEffect(() => {
    console.log(" ------- useEffect  in inputform----------");
    console.log(" clickedIndexNum!!! - " + clickedIndexNum);

    if (isAddBtnClicked) {
      clearInfo();
      console.log("InputForm.js - clearInfo ");
    }
  }, [isAddBtnClicked]);

  useEffect(() => {
    const fetchCustomerInfo = async () => {
      try {
        let testArr = getClickedIndexData(responseData, clickedIndexNum);
        setCustomerInfo(testArr);
      } catch (e) {
        console.log("error");
      }
    };
    if (isAddBtnClicked) {
      clearInfo();
      console.log("InputForm.js - clearInfo ");
    }
    else {
      fetchCustomerInfo();
    }
  }, [clickedIndexNum]);

  const saveCustomerInfo = async () => {
    try {
      if (isAddBtnClicked && isDataExist) {

        let obj = {};
        const response = await axios.get(
          'api/domain/getMaxId');
        console.log("!!!!!!!!!!@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@!!!!!!!!!!!!!!!!!!!");
        console.log(response.data);

        obj["id"] = ((response.data + 1).toString());

        tempReqeustBody = { ...customerInfo, ...obj };

        console.log(tempReqeustBody);
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@!");


        console.log("saveCustomerInfo");
        console.log(customerInfo);
        const res = await axios.post(
          '/api/domain', tempReqeustBody
        )
        console.log("res");
        console.log(res);
      }
      else if (isAddBtnClicked && !isDataExist) {
        let obj = {};
        obj["id"] = ('1');

        tempReqeustBody = { ...customerInfo, ...obj };
        const res = await axios.post(
          '/api/domain', tempReqeustBody
        )
        console.log(res);
      }
      else {
        // console.log("putput ");
        // await axios.put(
        //   '/api/customer/' + customerInfo.id, customerInfo
        // )
      }
      alert('Save');
      props.fetchCustomers();
      addBtnDispatch(reset());
    }
    catch (e) {
      alert('Error');
      addBtnDispatch(click());
      
    }
  }

  const addNewId = () => {
    let obj = {};
    obj["id"] = (Number(totalElements) + 1).toString();
    tempReqeustBody = { ...customerInfo, ...obj };
    setCustomerInfo(() => {
      return { ...customerInfo, ...obj }
    });
    console.log(customerInfo);
  }

  const onSave = () => {
    console.log(customerInfo);
    addNewId();

    if (window.confirm("저장하시겠습니까?")) {
      saveCustomerInfo()
    }
  }

  const onDelete = () => {
    const deleteCustomerInfo = async () => {
      try {
        await axios.delete(
          '/api/domain/' + customerInfo.id
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
    let obj = {};
    // obj["dataTypeId"] = event.target.value;
    switch (event.target.value) {
      case "INTEGER":
        obj["dataTypeName"] = "INTEGER";
        obj["dataTypeId"] = "1";
        break;
      case "STRING":
        obj["dataTypeName"] = "STRING";
        obj["dataTypeId"] = "2";
        break;

      case "VARCHAR":
        obj["dataTypeName"] = "VARCHAR";
        obj["dataTypeId"] = "3";
        break;

      case "TIMESTAMP":
        obj["dataTypeName"] = "TIMESTAMP";
        obj["dataTypeId"] = "6";
        break;

      case "NULL":
        obj["dataTypeName"] = "NULL";
        obj["dataTypeId"] = "7";
        break;

      default:
        obj["dataTypeName"] = "NULL";
        obj["dataTypeId"] = "7";
        break;
    }
    tempReqeustBody = { ...customerInfo, ...obj };
    setCustomerInfo(() => {
      return { ...customerInfo, ...obj }
    });
  };

  const onChange = (e, field) => {
    let obj = {};
    obj[field] = e.target.value;
    setCustomerInfo({ ...customerInfo, ...obj });
  }

  const onChangeOnlyNumber = (e, field) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      let obj = {};
      obj[field] = e.target.value;
      setCustomerInfo({ ...customerInfo, ...obj });
    }
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        도메인 관리 화면 - Domain Management
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="korName"
            name="korName"
            label="한글명"
            fullWidth
            variant="standard"
            value={customerInfo.korName || ""}
            onChange={(e) => {
              onChange(e, "korName");
            }}
            disabled={!isAddBtnClicked}
            inputProps={{ maxLength: 20 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="engName"
            name="engName"
            label="영문명"
            fullWidth
            variant="standard"
            value={customerInfo.engName || ""}
            onChange={(e) => {
              onChange(e, "engName");
            }}
            disabled={!isAddBtnClicked}
            inputProps={{ maxLength: 30 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="engInitName"
            name="engInitName"
            label="영문 약어명"
            fullWidth
            variant="standard"
            value={customerInfo.engInitName || ""}
            onChange={(e) => {
              onChange(e, "engInitName");
            }}
            disabled={!isAddBtnClicked}
            inputProps={{ maxLength: 20 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="description"
            name="description"
            label="단어 설명"
            fullWidth
            variant="standard"
            value={customerInfo.description || ""}
            onChange={(e) => {
              onChange(e, "description");
            }}
            disabled={!isAddBtnClicked}
            inputProps={{ maxLength: 100 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="length"
            name="length"
            label="데이터 길이(숫자만 입력) "
            fullWidth
            autoComplete="standard"
            variant="standard"
            value={customerInfo.length || ""}
            onChange={(e) => {
              onChangeOnlyNumber(e, "length");
            }}
            disabled={!isAddBtnClicked}
            inputProps={{ maxLength: 5 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Data type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="dataTypeName"
              name="dataTypeName"
              value={customerInfo.dataTypeName || ""}
              label="Data type"
              onChange={handleSelectChange}
              disabled={!isAddBtnClicked}
            >
              {/* <MenuItem value={"1"}>varchar</MenuItem>
              <MenuItem value={"2"}>int</MenuItem>
              <MenuItem value={"3"}>timestamp</MenuItem>
              <MenuItem value={"4"}>null</MenuItem> */}
              <MenuItem value={"INTEGER"}>INTEGER</MenuItem>
              <MenuItem value={"STRING"}>STRING</MenuItem>
              <MenuItem value={"VARCHAR"}>VARCHAR</MenuItem>
              <MenuItem value={"TIMESTAMP"}>TIMESTAMP</MenuItem>
              <MenuItem value={"NULL"}>NULL</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="zip"
            name="zip"
            label="TBD"
            fullWidth
            variant="standard"
            disabled={!isAddBtnClicked}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="country"
            name="country"
            label="TBD"
            fullWidth
            variant="standard"
            disabled={!isAddBtnClicked}
          />
        </Grid>
        <Grid item xs={12}>
        </Grid>
      </Grid>
      <Stack direction="row" spacing={2}>
        <Button variant="outlined" startIcon={<DeleteIcon />} disabled={isAddBtnClicked} onClick={onDelete}>
          Delete
        </Button>
        <Button variant="contained" endIcon={<SaveIcon />} disabled={!isAddBtnClicked} onClick={onSave}>
          Save
        </Button>
      </Stack>
    </React.Fragment>
  );
};

export default InputForm;