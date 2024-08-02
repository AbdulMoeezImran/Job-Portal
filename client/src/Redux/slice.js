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
  reducers: {
    setUserData(state, action) {
      state.userInfo = action.payload;
      state.userPending = false;
    },
  },
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

export const { setUserData } = userSlice.actions;

export const userReducer = userSlice.reducer;
