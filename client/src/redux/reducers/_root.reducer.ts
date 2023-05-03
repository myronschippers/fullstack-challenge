import { combineReducers } from '@reduxjs/toolkit';
import customers from './customersSlice.reducer';

export default combineReducers({
  customers,
});
