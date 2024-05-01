import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { remarksDepartment } from '../api/remarks';

// Define an async thunk action creator to fetch remarks data
export const fetchRemarks = createAsyncThunk(
  'remarks/fetchRemarks', 
  async () => {
    try {
      // Call your API function to fetch remarks data
      const response = await remarksDepartment(1);
      return response.data; // Assuming response is in the format { data: yourData }
    } catch (error) {
      // Handle any errors
      throw Error('Failed to fetch remarks data'); // Throw an error to be caught by the rejected action
    }
  }
);

// const initialState = {
//   data: null as string | null,
//   loading: 'idle',
//   error: null as string | null, // Provide a default error message
// };

// Create a slice for managing remarks data
const remarksSlice = createSlice({
  name: 'remarks',
  initialState: { entities: [], loading: 'idle', data: {
    "status": "",
      "message": "",
    "departments": {
        "id": 1,
        "createdAt": "2024-04-20T08:20:59.096Z",
        "updatedAt": "2024-04-20T08:20:59.096Z",
        "departmentName": "CHP"
    }
}

  },
  reducers: {
    // Add any reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRemarks.pending, (state:any) => {
        state.loading = 'loading';
      })
      .addCase(fetchRemarks.fulfilled, (state:any, action:any) => {
        state.loading = 'idle';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchRemarks.rejected, (state:any, action:any) => {
        state.loading = 'idle';
        state.error = action.error.message ? action.error.message : 'Failed to fetch remarks data'; // Provide a default error message if there's none
      });
  },
});

export default remarksSlice.reducer;
