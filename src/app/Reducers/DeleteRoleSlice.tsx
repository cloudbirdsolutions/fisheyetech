"use client";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {deleteroleapi} from '../api/Deleterole';

// Define the async thunk for fetching role data
export const deleterole = createAsyncThunk('deleteroles/deleterole', async (formdata:any) => {
 
    const data = await deleteroleapi(formdata);
    return data;
 });
// Define the role slice
const createroleslice = createSlice({
  name: 'deleteroles',
  initialState: { entities: [], loading: 'idle', data: {} },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(deleterole.pending, (state:any) => {
      state.status = "loading";
    })
    .addCase(deleterole.fulfilled, (state:any, action:any) => {
      state.status = "succeeded";
      state.data = action.payload;
    })
    .addCase(deleterole.rejected, (state:any, action:any) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
})

export default createroleslice.reducer;