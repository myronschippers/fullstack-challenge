import { combineReducers } from '@reduxjs/toolkit';
import counter from './counterSlice.reducer';
import customers from './customersSlice.reducer';

export default combineReducers({
  counter,
  customers,
});
