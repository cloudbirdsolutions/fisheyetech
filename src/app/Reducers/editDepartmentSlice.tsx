"use client";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {editdepartmentapi} from '../api/editdepartment';

// Define the async thunk for fetching department data
export const editdepartment = createAsyncThunk('editdepartments/editedepartment', async (formdata:any) => {
 
    const data = await editdepartmentapi(formdata);
    return data;
 });
// Define the department slice
const editdepartmentslice = createSlice({
  name: 'editdepartments',
  initialState: { entities: [], loading: 'idle', data: {} },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(editdepartment.pending, (state:any) => {
      state.status = "loading";
    })
    .addCase(editdepartment.fulfilled, (state:any, action:any) => {
      state.status = "succeeded";
      state.data = action.payload;
    })
    .addCase(editdepartment.rejected, (state:any, action:any) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
})

export default editdepartmentslice.reducer;