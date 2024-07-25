import { getRequest } from "@/GlobalFunctions/ApiRequest";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  try {
    const data = await getRequest("/auth/userInfo");
    return data;
  } catch (error) {
    throw error;
  }
});

// User Slice
export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    userPending: true,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, state => {
        state.userPending = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.userPending = false;
      })
      .addCase(fetchUser.rejected, state => {
        state.userPending = false;
      });
  },
});

export const userReducer = userSlice.reducer;

// Job Slice
export const jobSlice = createSlice({
  name: "Job",
  initialState: {
    JobData: [],
    myJobs: null,
  },
  reducers: {
    setJobData: (state, action) => {
      state.JobData = action.payload;
    },
    setMyJobs: (state, action) => {
      state.myJobs = action.payload;
    },
  },
});

export const { setJobData, setMyJobs } = jobSlice.actions;

export const jobReducer = jobSlice.reducer;

//  Applied Job Slice
export const appliedJobSlice = createSlice({
  name: "AppliedJob",
  initialState: {
    appliedJob: [],
    bookMark: [],
  },
  reducers: {
    setAppliedJob: (state, action) => {
      state.appliedJob = action.payload;
    },
    setBookMark: (state, action) => {
      state.bookMark = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAppliedJob, setBookMark } = appliedJobSlice.actions;

export const appliedJobReducer = appliedJobSlice.reducer;
