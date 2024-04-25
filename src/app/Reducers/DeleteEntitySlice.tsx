"use client";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteentityapi } from '../api/Deleteentity';

// Define the async thunk for fetching user data
export const deleteentity = createAsyncThunk('deleteentitys/deleteeentity', async (formdata:any) => {
 
    const data = await deleteentityapi(formdata);
    return data;
 });
// Define the user slice
const deleteentitySlice = createSlice({
  name: 'deleteentitys',
  initialState: { entities: [], loading: 'idle', data: {} },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(deleteentity.pending, (state:any) => {
      state.status = "loading";
    })
    .addCase(deleteentity.fulfilled, (state:any, action:any) => {
      state.status = "succeeded";
      state.data = action.payload;
    })
    .addCase(deleteentity.rejected, (state:any, action:any) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
})

export default deleteentitySlice.reducer;