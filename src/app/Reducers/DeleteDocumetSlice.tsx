"use client";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {deletedocumentapi} from '../api/Deletedocument';

// Define the async thunk for fetching document data
export const deletedocument = createAsyncThunk('deletedocuments/deletedocument', async (formdata:any) => {
 
    const data = await deletedocumentapi(formdata);
    return data;
 });
// Define the document slice
const deletedocumentSlice = createSlice({
  name: 'deletedocuments',
  initialState: { entities: [], loading: 'idle', data: {} },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(deletedocument.pending, (state:any) => {
      state.status = "loading";
    })
    .addCase(deletedocument.fulfilled, (state:any, action:any) => {
      state.status = "succeeded";
      state.data = action.payload;
    })
    .addCase(deletedocument.rejected, (state:any, action:any) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
})

export default deletedocumentSlice.reducer;