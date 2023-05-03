import { combineReducers } from '@reduxjs/toolkit';
import counter from './counterSlice.reducer';

export default combineReducers({
  counter,
});
