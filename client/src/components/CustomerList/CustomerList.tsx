import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActionPanel } from '../ActionPanel';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchCustomers } from '../../redux/reducers/customersSlice.reducer';
import styles from './CustomerList.module.css';

export const CustomerList: React.FC<{}> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const customers = useSelector((state: RootState) => state.customers);

  const customersResultsList = customers.pages.customers.map(
    (customerRecord) => {
      return (
        <ActionPanel onClick={() => console.log(customerRecord)}>
          {customerRecord.firstName} {customerRecord.lastName}
        </ActionPanel>
      );
    }
  );

  useEffect(() => {
    dispatch(fetchCustomers());
  }, []);

  return (
    <div className={styles.listContainer}>
      {customersResultsList.length > 0
        ? customersResultsList
        : 'No Customers Available'}
    </div>
  );
};

CustomerList.displayName = 'CustomerList';
