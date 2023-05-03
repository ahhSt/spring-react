import React, { useState, useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import axios from 'axios';
import { MenuItem, FormControl, Select, InputLabel, Stack, Button, TextField, Typography, Grid} from '@mui/material'
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { reset } from './addBtnSlice';

const InputForm = (props) => {
  let tempReqeustBody;
  let totalElements = props.totalElements;
  let clickedId = props.clickedId;

  const [index, setIndex] = useState(props.id);   // MEMO: id : selected Index
  const [isNew, setIsNew] = useState(props.isNew);
  const [customerInfo, setCustomerInfo] = useState({});
   
  const addBtnDispatch = useDispatch();
  const isAddBtnClicked = useSelector(state => {
    return state.isAddBtnClicked.value;
  });
  
  function clearInfo() {
    setCustomerInfo({ id: index, korName: "", engName: "", engInitName: "", description: "", dataTypeId: "", length: "" });
  }

  const getClickedIndexData = (respData, clickedDataID) => {
    let testObj = respData.data.content;
    let isFindClickedId = false;
    for (let arrObj of respData.data.content) {
      if (arrObj.id == (Number(clickedDataID))) {
        console.log("//////////////////////////");
        console.log("                          ");
        console.log(arrObj);
        console.log("                          ");
        console.log("//////////////////////////");
        testObj = arrObj;
        isFindClickedId = true;
      }
    }
    if (isFindClickedId)
      return testObj;
    else 
    {
      return respData.data.content[0];
    }
  }

  useEffect(() => {
    setIsNew(props.isNew);
    setIndex(props.id);
    console.log(" ------- useEffect  in inputform----------");
    console.log(" the Index!!! - " + index);
  });

  useEffect(() => {
    const DetailInfo = (idx) => {
      const fetchCustomerInfo = async (idx) => {
        try {
          const response = await axios.get(
            'api/domain/getAll', {
            params: {
              "page": 0,
              "size": 16,
              "sort": "string"
            }
          }
          );
          let testArr = getClickedIndexData(response, clickedId);
          console.log("After getClickedIndexData ");
          console.log(testArr);
          setCustomerInfo(testArr);
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

        let obj = {};
        const response = await axios.get(
          'api/domain/maxId' );
          console.log("!!!!!!!!!!@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@!!!!!!!!!!!!!!!!!!!");
          console.log(response.data);
    
        // obj["id"] = (Number(totalElements) + 1).toString();
        obj["id"] = ((response.data+ 1).toString());
    
        tempReqeustBody = { ...customerInfo, ...obj };

        console.log(tempReqeustBody);
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@!");


        console.log("saveCustomerInfo");
        console.log(customerInfo);
        const res = await axios.post(
          '/api/domain/insert', tempReqeustBody
        )
        console.log("res");
        console.log(res);
        props.clearIsNew();
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
      saveCustomerInfo();
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
    obj["dataTypeId"] = event.target.value;
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
            inputProps={{maxLength: 20}}
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
            inputProps={{maxLength: 30}}
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
            inputProps={{maxLength: 20}}
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
            inputProps={{maxLength: 100}}
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
            inputProps={{maxLength: 5}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Data type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="dataTypeId"
              name="dataTypeId"
              value={customerInfo.dataTypeId || ""}
              label="Data type"
              onChange={handleSelectChange}
              disabled={!isAddBtnClicked}
            >
              <MenuItem value={"1"}>varchar</MenuItem>
              <MenuItem value={"2"}>int</MenuItem>
              <MenuItem value={"3"}>timestamp</MenuItem>
              <MenuItem value={"4"}>null</MenuItem>
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