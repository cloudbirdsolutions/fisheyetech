"use client";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {editfollowupstatusapi} from '@/app/api/editFollowupstatus';

// Define the async thunk for fetching user data
export const editfollowupstatus = createAsyncThunk('editfollowupstatuss/editefollowupstatus', async (formdata:any) => {
 
    const data = await editfollowupstatusapi(formdata);
    return data;
 });
// Define the user slice
const editfollowupstatusSlice = createSlice({
  name: 'editfollowupstatuss',
  initialState: { entities: [], loading: 'idle', data: {} },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(editfollowupstatus.pending, (state:any) => {
      state.status = "loading";
    })
    .addCase(editfollowupstatus.fulfilled, (state:any, action:any) => {
      state.status = "succeeded";
      state.data = action.payload;
    })
    .addCase(editfollowupstatus.rejected, (state:any, action:any) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
})

export default editfollowupstatusSlice.reducer;