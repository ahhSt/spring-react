import { createSlice } from '@reduxjs/toolkit';

export const addBtnSliceWord = createSlice({
  name: 'isAddBtnClicked',
  initialState: { value: false },
  reducers: {
    click: (state, action) => {
      state.value = true;
    },
    reset: (state) => {
      state.value = false;
    }
  }
});

export const clickedIndexSliceWord = createSlice({
  name: 'clickedIndexNum',
  initialState: { value: 0 },
  reducers: {
    resetIndex: (state) => {
      state.value = 0;
    },
    setIndex: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { click, reset } = addBtnSliceWord.actions;
export const { resetIndex, setIndex } = clickedIndexSliceWord.actions;