import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActionPanel } from '../ActionPanel';
import { AppDispatch, RootState } from '../../redux/store';
import { selectCustomer } from '../../redux/reducers/customersSlice.reducer';
import { ICustomerListItemProps } from './types';

export const CustomerListItem: React.FC<ICustomerListItemProps> = ({
  customer,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const customers = useSelector((state: RootState) => state.customers);

  return (
    <div onClick={() => dispatch(selectCustomer(customer))}>
      <ActionPanel isSelected={customers.selected?.id === customer.id}>
        {customer.firstName} {customer.lastName}
      </ActionPanel>
    </div>
  );
};

CustomerListItem.displayName = 'CustomerListItem';
