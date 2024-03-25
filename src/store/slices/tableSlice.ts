import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DEFAULT_ROWS_PER_PAGE } from '../../constants/tableConstants';

const initialState: { rowsPerPage: number } = {
  rowsPerPage: DEFAULT_ROWS_PER_PAGE,
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    rowsPerPageChange(state: any, action: PayloadAction<number>) {
      const newRowsPerPage = action.payload;
      state.rowsPerPage = newRowsPerPage;
    },
  },
});

export const tableActions = tableSlice.actions;

export const tableReducer = tableSlice.reducer;
