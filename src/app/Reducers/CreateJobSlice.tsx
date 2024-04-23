"use client";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {createjobapi} from '../api/Createjob';

// Define the async thunk for fetching job data
export const createjob = createAsyncThunk('createjobs/createjob', async (formdata:any) => {
 
    const data = await createjobapi(formdata);
    return data;
 });
// Define the job slice
const createjobSlice = createSlice({
  name: 'createjobs',
  initialState: { entities: [], loading: 'idle', data: {} },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(createjob.pending, (state:any) => {
      state.status = "loading";
    })
    .addCase(createjob.fulfilled, (state:any, action:any) => {
      state.status = "succeeded";
      state.data = action.payload;
    })
    .addCase(createjob.rejected, (state:any, action:any) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
})

export default createjobSlice.reducer;