import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getCustomers, Customer, CustomersPages } from '../../api/customers';

export interface CustomersState {
  loading: 'pending' | 'rejected' | 'fulfilled' | null;
  selected: Customer | null;
  pages: CustomersPages;
}

const initialState = {
  loading: null,
  selected: null,
  pages: {
    totalItems: 0,
    totalPages: 0,
    currentPage: 0,
    customers: [],
  },
} as CustomersState;

export const fetchCustomers = createAsyncThunk(
  'customers/fetchCustomers',
  async () => {
    const customersPages = await getCustomers();
    return customersPages;
  }
);

export const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCustomers.pending, (state: CustomersState) => {
      state.loading = 'pending';
    });

    builder.addCase(
      fetchCustomers.fulfilled,
      (state: CustomersState, action: PayloadAction<CustomersPages>) => {
        state.loading = 'fulfilled';
        state.pages = action.payload;
      }
    );

    builder.addCase(fetchCustomers.rejected, (state: CustomersState) => {
      state.loading = 'rejected';
    });
  },
});

export default customersSlice.reducer;
