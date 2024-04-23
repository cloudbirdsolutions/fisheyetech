"use client";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {createentityapi} from '../api/CreateEntity';

// Define the async thunk for fetching user data
export const createEntity = createAsyncThunk('createEntitys/createEntity', async (formdata:any) => {
 
    const data = await createentityapi(formdata);
    return data;
 });
// Define the user slice
const createentitySlice = createSlice({
  name: 'createEntitys',
  initialState: { entities: [], loading: 'idle', data: {} },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(createEntity.pending, (state:any) => {
      state.status = "loading";
    })
    .addCase(createEntity.fulfilled, (state:any, action:any) => {
      state.status = "succeeded";
      state.data = action.payload;
    })
    .addCase(createEntity.rejected, (state:any, action:any) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
})

export default createentitySlice.reducer;