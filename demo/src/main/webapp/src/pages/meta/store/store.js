import {configureStore} from '@reduxjs/toolkit';
import {addBtnSlice, clickedIndexSlice} from '../testJH3/domainSlice';

export const store = configureStore({
    reducer: {
      isAddBtnClicked: addBtnSlice.reducer,
      clickedIndexNum: clickedIndexSlice.reducer
    }
  });

export default store;