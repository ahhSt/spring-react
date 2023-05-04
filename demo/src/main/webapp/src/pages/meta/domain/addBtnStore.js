import {configureStore} from '@reduxjs/toolkit';
import addBtnSlice from './addBtnSlice';


const addBtnStore = configureStore({
    reducer: {
      isAddBtnClicked: addBtnSlice.reducer
    }
  });

export default addBtnStore;