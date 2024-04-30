"use client";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {createdepartmentremarksapi} from '../api/CreateDepartmentRemarks';

interface Department{
    id:number,
    createdAt:string,
    updatedAt:string,
    departmentName:string
}
export const createdepartment = createAsyncThunk('createdepartments/createdepartment', async (formdata:any) => {
 
    const data = await createdepartmentremarksapi(formdata);
    return data;
 });

const createdepartmentremarkslice = createSlice({
  name: 'createdepartmentremark',
  initialState: { entities: [], loading: 'idle', data: {} },
  reducers: {
   
  },
  extraReducers: (builder) => {
    
    builder.addCase(createdepartment.pending, (state:any) => {
      state.status = "loading";
    })
    .addCase(createdepartment.fulfilled, (state:any, action:any) => {
      state.status = "succeeded";
      state.data = action.payload;
    })
    .addCase(createdepartment.rejected, (state:any, action:any) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
})

export default createdepartmentremarkslice.reducer;