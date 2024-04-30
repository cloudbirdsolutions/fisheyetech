"use client";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {createdocumentapi} from '../api/Createdocument';

// Define the async thunk for fetching document data
export const createdocument = createAsyncThunk('createdocuments/createdocument', async (passData:any) => {
 
    const data = await createdocumentapi(passData.sheetId, passData.userId, passData.transitionId);
    return data;
 });
// Define the document slice
const createdocumentslice = createSlice({
  name: 'createdocuments',
  initialState: { entities: [], loading: 'idle', data: {} },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(createdocument.pending, (state:any) => {
      state.status = "loading";
    })
    .addCase(createdocument.fulfilled, (state:any, action:any) => {
      state.status = "succeeded";
      state.data = action.payload;
    })
    .addCase(createdocument.rejected, (state:any, action:any) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
})

export default createdocumentslice.reducer;