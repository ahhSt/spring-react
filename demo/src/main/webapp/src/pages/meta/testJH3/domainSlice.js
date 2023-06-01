import { createSlice} from '@reduxjs/toolkit';

export const addBtnSlice = createSlice({
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

export const clickedIndexSlice = createSlice({
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

// export default addBtnSlice;
export const { click, reset } = addBtnSlice.actions;
export const { resetIndex, setIndex } = clickedIndexSlice.actions;