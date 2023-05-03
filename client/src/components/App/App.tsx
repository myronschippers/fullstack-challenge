import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from '../../templates/Layout';
import { AppDispatch, RootState } from '../../redux/store';
import {
  decrement,
  increment,
} from '../../redux/reducers/counterSlice.reducer';
import { fetchCustomers } from '../../redux/reducers/customersSlice.reducer';
import './App.css';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const count = useSelector((state: RootState) => state.counter.value);
  const customers = useSelector((state: RootState) => state.customers);

  const customersResultsList = customers.pages.customers.map(
    (customerRecord) => {
      return (
        <div>
          {customerRecord.firstName} {customerRecord.lastName}
        </div>
      );
    }
  );

  useEffect(() => {
    dispatch(fetchCustomers());
  }, []);

  return (
    <Layout data-test-id="AppContainer">
      <div>
        {customersResultsList.length > 0
          ? customersResultsList
          : 'No Customers Available'}
      </div>
      <div>
        <button onClick={() => dispatch(decrement())}>-</button>
        <span>{count}</span>
        <button onClick={() => dispatch(increment())}>+</button>
      </div>
    </Layout>
  );
}

export default App;
