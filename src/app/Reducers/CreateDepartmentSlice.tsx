"use client";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {createdepartmentapi} from '../api/Createdepartment';

// Define the async thunk for fetching department data
export const createdepartment = createAsyncThunk('createdepartments/createdepartment', async (formdata:any) => {
 
    const data = await createdepartmentapi(formdata);
    return data;
 });
// Define the department slice
const createdepartmentslice = createSlice({
  name: 'createdepartments',
  initialState: { entities: [], loading: 'idle', data: {} },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(createdepartment.pending, (state:any) => {
      state.status = "loading";
    })
    .addCase(createdepartment.fulfilled, (state:any, action:any) => {
      state.status = "succeeded";
      state.data = action.payload;
    })
    .addCase(createdepartment.rejected, (state:any, action:any) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
})

export default createdepartmentslice.reducer;