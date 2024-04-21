"use client";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {edituserapi} from '../api/edituser';

// Define the async thunk for fetching user data
export const edituser = createAsyncThunk('editusers/editeuser', async (formdata:any) => {
 
    const data = await edituserapi(formdata);
    return data;
 });
// Define the user slice
const edituserSlice = createSlice({
  name: 'editusers',
  initialState: { entities: [], loading: 'idle', data: {} },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(edituser.pending, (state:any) => {
      state.status = "loading";
    })
    .addCase(edituser.fulfilled, (state:any, action:any) => {
      state.status = "succeeded";
      state.data = action.payload;
    })
    .addCase(edituser.rejected, (state:any, action:any) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
})

export default edituserSlice.reducer;