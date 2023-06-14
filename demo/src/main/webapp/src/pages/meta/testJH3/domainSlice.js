import { createSlice} from '@reduxjs/toolkit';

export const addBtnSliceDomain = createSlice({
  name: 'isAddBtnClickedDomain',
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

export const clickedIndexSliceDomain = createSlice({
  name: 'clickedIndexNumDomain',
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
export const { click, reset } = addBtnSliceDomain.actions;
export const { resetIndex, setIndex } = clickedIndexSliceDomain.actions;