"use client";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {editroleapi} from '../api/editrole';

// Define the async thunk for fetching role data
export const editrole = createAsyncThunk('editroles/editerole', async (formdata:any) => {
 
    const data = await editroleapi(formdata);
    return data;
 });
// Define the role slice
const editroleslice = createSlice({
  name: 'editroles',
  initialState: { entities: [], loading: 'idle', data: {} },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(editrole.pending, (state:any) => {
      state.status = "loading";
    })
    .addCase(editrole.fulfilled, (state:any, action:any) => {
      state.status = "succeeded";
      state.data = action.payload;
    })
    .addCase(editrole.rejected, (state:any, action:any) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
})

export default editroleslice.reducer;