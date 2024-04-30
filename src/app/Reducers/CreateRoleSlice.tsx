"use client";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {createroleapi} from '../api/Createrole';

// Define the async thunk for fetching role data
export const createrole = createAsyncThunk('createroles/createrole', async (formdata:any) => {
 
    const data = await createroleapi(formdata);
    return data;
 });
// Define the role slice
const createroleslice = createSlice({
  name: 'createroles',
  initialState: { entities: [], loading: 'idle', data: {} },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(createrole.pending, (state:any) => {
      state.status = "loading";
    })
    .addCase(createrole.fulfilled, (state:any, action:any) => {
      state.status = "succeeded";
      state.data = action.payload;
    })
    .addCase(createrole.rejected, (state:any, action:any) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
})

export default createroleslice.reducer;