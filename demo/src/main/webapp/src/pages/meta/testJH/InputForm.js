import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { MenuItem, FormControl, Select, InputLabel, Button, Stack, TextField, Typography, Grid } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { reset } from './addBtnSlice';

const InputForm = (props) => {
  let tempReqeustBody;
  let totalElements = props.totalElements;
  let clickedId = props.clickedId;

  const [index, setIndex] = useState(props.id); // MEMO: 부모 컴포넌트 index.js의 selectedIndex 값이 id로 들어옴.
  const [isNew, setIsNew] = useState(props.isNew);
  const [customerInfo, setCustomerInfo] = useState({});
  const [dataType, setDataType] = useState(''); // TODO: 추후에 DB로 부터 불러온 Resp 값을 set 하는 것으로 수정하기.
  const isDataExist = props.isDataExist;
  
  const addBtnDispatch = useDispatch();
  const isAddBtnClicked = useSelector(state => {
    return state.isAddBtnClicked.value;
  });

  function clearInfo() {
    setCustomerInfo({ id: index, korName: "", engName: "", engInitName: "", description: "" });
  }

  // 20230525 MEMO :  여기로 ClickedDataId가 minId로 제대로 안 들어오는 듯...
  const getClickedIndexData = (respData, clickedDataID) => {
    let testObj = respData.data.content;
    let isFindClickedId = false;
    for (let arrObj of respData.data.content) {
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
      return respData.data.content[0];
    }
  }

  useEffect(() => {
    setIsNew(props.isNew);
    setIndex(props.id);
    console.log(" ------- handleListItemClick  in inputform----------");
    console.log("Clicked the Index!!! - " + index);
  });

  useEffect(() => {
    const DetailInfo = (idx) => {
      const fetchCustomerInfo = async (idx) => {
        try {
          const response = await axios.get(
            'api/word/getAll', {
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
      if (isNew && isDataExist) {

        // 아래는 domain 부분 잠시 갖다둔거. 다음 커밋에 삭제 예정.
        // let obj = {};
        // const response = await axios.get(
        //   'api/domain/maxId' );
        //   console.log("!!!!!!!!!!@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@!!!!!!!!!!!!!!!!!!!");
        //   console.log(response.data);

        // // obj["id"] = (Number(totalElements) + 1).toString();
        // obj["id"] = ((response.data+ 1).toString());

        // tempReqeustBody = { ...customerInfo, ...obj };

        // console.log("saveCustomerInfo");
        // console.log(tempReqeustBody);
        // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@!");

        let obj = {};
        const response = await axios.get(
          'api/word/getMaxId');
        console.log("!!!!!!!!!!@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@!!!!!!!!!!!!!!!!!!!");
        console.log(response.data);

        // obj["id"] = (Number(totalElements) + 1).toString();
        obj["id"] = ((response.data + 1).toString());

        tempReqeustBody = { ...customerInfo, ...obj };

        console.log(tempReqeustBody);
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@!");


        console.log("saveCustomerInfo");
        console.log(customerInfo);
        const res = await axios.post(
          '/api/word', tempReqeustBody
        )
        console.log("res");
        console.log(res);
        props.clearIsNew();
      }
      else if (isNew && !isDataExist){
        let obj = {}; 
        obj["id"] = ('1');
    
        tempReqeustBody = { ...customerInfo, ...obj };
        const res = await axios.post(
          '/api/word', tempReqeustBody
        )
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
          '/api/word/' + customerInfo.id
        )
        alert('Delete');
//        props.clearIsNew();
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

  // const handleSelectChange = (event) => {
  //   setDataType(event.target.value);
  // };

  const onChange = (e, field) => {
    let obj = {};
    obj[field] = e.target.value;
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
            // autoComplete="name"
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
            // required
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
            // required
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
        <Button variant="contained" endIcon={<SaveIcon />}  disabled={!isAddBtnClicked} onClick={onSave}>
          Save
        </Button>
      </Stack>
    </React.Fragment>
  );
};

export default InputForm;