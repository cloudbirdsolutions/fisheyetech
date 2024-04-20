"use client";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {deleteuserapi} from '../api/Deleteuser';

// Define the async thunk for fetching user data
export const deleteuser = createAsyncThunk('deleteusers/deleteuser', async (formdata:any) => {
 
    const data = await deleteuserapi(formdata);
    return data;
 });
// Define the user slice
const createuserSlice = createSlice({
  name: 'deleteusers',
  initialState: { entities: [], loading: 'idle', data: {} },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(deleteuser.pending, (state:any) => {
      state.status = "loading";
    })
    .addCase(deleteuser.fulfilled, (state:any, action:any) => {
      state.status = "succeeded";
      state.data = action.payload;
    })
    .addCase(deleteuser.rejected, (state:any, action:any) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
})

export default createuserSlice.reducer;