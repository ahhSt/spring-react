import {createSlice} from '@reduxjs/toolkit';

const addBtnSlice = createSlice({
    name: 'isAddBtnClicked',
    initialState: { value: false },
    reducers: {
      click: (state, action) => {
        state.value = !state.value;
        console.log("addBtnSlice!!!!!!!!!!")
      },
      reset: (state) => {
        state.value = false;
        console.log("clickCancel!!!!!!!!!!")
      }
    }
  });


export default addBtnSlice;
export const {click, reset} = addBtnSlice.actions;