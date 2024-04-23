"use client";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {editentityapi} from '../api/editEntity';

// Define the async thunk for fetching user data
export const editentity = createAsyncThunk('editentitys/editeentity', async (formdata:any) => {
 
    const data = await editentityapi(formdata);
    return data;
 });
// Define the user slice
const editentitySlice = createSlice({
  name: 'editentitys',
  initialState: { entities: [], loading: 'idle', data: {} },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(editentity.pending, (state:any) => {
      state.status = "loading";
    })
    .addCase(editentity.fulfilled, (state:any, action:any) => {
      state.status = "succeeded";
      state.data = action.payload;
    })
    .addCase(editentity.rejected, (state:any, action:any) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
})

export default editentitySlice.reducer;