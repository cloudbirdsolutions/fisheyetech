"use client";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {createuserapi} from '../api/Createuser';

// Define the async thunk for fetching user data
export const createuser = createAsyncThunk('user/createuser', async (formdata:any) => {
 
    const data = await createuserapi(formdata);
    return data;
 });
// Define the user slice
const createuserSlice = createSlice({
  name: 'createuser',
  initialState: { entities: [], loading: 'idle', data: {} },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(createuser.pending, (state:any) => {
      state.status = "loading";
    })
    .addCase(createuser.fulfilled, (state:any, action:any) => {
      state.status = "succeeded";
      state.data = action.payload;
    })
    .addCase(createuser.rejected, (state:any, action:any) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
})

export default createuserSlice.reducer;