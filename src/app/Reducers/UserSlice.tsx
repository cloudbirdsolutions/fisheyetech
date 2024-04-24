"use client";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {fetchUserDetails} from '../api/UserDetails';

// Define the async thunk for fetching user data
export const fetchUserData = createAsyncThunk('user/fetchUserData', async (userdata:string) => {
 
    const data = await fetchUserDetails(userdata);
    return data;
 });
// Define the user slice
const userSlice = createSlice({
  name: 'user',
  initialState: { entities: [], loading: 'idle', data: 
    {
      "status": "",
      "message": "",
      "data": {
          "id": 0,
          "createdAt": "",
          "updatedAt": "",
          "name": "",
          "userName": "",
          "address": "",
          "phone": "",
          "password": "",
          "statusId": 0,
          "rolesId": 0,
          "roles": {
              "roleName": ""
          },
          "statusMaster": {
              "statusName": ""
          }
      }
  
  } },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUserData.pending, (state:any) => {
      state.status = "loading";
    })
    .addCase(fetchUserData.fulfilled, (state:any, action:any) => {
      state.status = "succeeded";
      state.data = action.payload;
    })
    .addCase(fetchUserData.rejected, (state:any, action:any) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
})

export default userSlice.reducer;