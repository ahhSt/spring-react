import {configureStore} from '@reduxjs/toolkit';
import {addBtnSliceDomain, clickedIndexSliceDomain} from '../testJH3/domainSlice';
import {addBtnSliceWord, clickedIndexSliceWord} from '../testJH/wordSlice';
export const store = configureStore({
    reducer: {
      isAddBtnClickedDomain: addBtnSliceDomain.reducer,
      clickedIndexNumDomain: clickedIndexSliceDomain.reducer,
      
      isAddBtnClickedWord: addBtnSliceWord.reducer,
      clickedIndexNumWord: clickedIndexSliceWord.reducer
    }
  });

export default store;