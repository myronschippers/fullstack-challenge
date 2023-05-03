import axios from 'axios';
import { UUID } from 'crypto';

export interface Customer {
  id: UUID;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomersPages {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  customers: Customer[];
}

export const getCustomers = async (): Promise<CustomersPages> => {
  const { data } = await axios.get('/api/customers');
  return data;
};
