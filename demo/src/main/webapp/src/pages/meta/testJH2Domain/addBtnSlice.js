import {createSlice} from '@reduxjs/toolkit';

const addBtnSlice = createSlice({
    name: 'isAddBtnClicked',
    initialState: { value: false },
    reducers: {
      click: (state, action) => {
        state.value = !state.value;
      },
      reset: (state) => {
        state.value = false;
      }
    }
  });


export default addBtnSlice;
export const {click, reset} = addBtnSlice.actions;