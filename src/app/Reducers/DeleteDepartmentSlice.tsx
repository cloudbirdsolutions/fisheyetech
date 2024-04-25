"use client";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {deletedepartmentapi} from '../api/Deletedepartment';

// Define the async thunk for fetching department data
export const deletedepartment = createAsyncThunk('deletedepartments/deletedepartment', async (formdata:any) => {
 
    const data = await deletedepartmentapi(formdata);
    return data;
 });
// Define the department slice
const createdepartmentslice = createSlice({
  name: 'deletedepartments',
  initialState: { entities: [], loading: 'idle', data: {} },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(deletedepartment.pending, (state:any) => {
      state.status = "loading";
    })
    .addCase(deletedepartment.fulfilled, (state:any, action:any) => {
      state.status = "succeeded";
      state.data = action.payload;
    })
    .addCase(deletedepartment.rejected, (state:any, action:any) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
})

export default createdepartmentslice.reducer;