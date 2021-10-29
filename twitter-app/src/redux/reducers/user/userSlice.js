import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";

export const signupAsync = createAsyncThunk(
  "user/signup",
  async (payload, { rejectWithValue }) => {
    const auth = getAuth();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: payload.displayName });
      const { uid, email, displayName } = user;
      return { uid, email, displayName };
    } catch (error) {
      return rejectWithValue(error.code);
    }
  }
);

const initialState = {
  loading: false,
  user: null,
  loginError: null,
  signupError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [signupAsync.pending]: (state) => {
      state.loading = true;
      state.loginError = null;
      state.signupError = null;
    },
    [signupAsync.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.loginError = null;
      state.signupError = null;
    },
    [signupAsync.rejected]: (state, action) => {
      state.loading = false;
      state.user = null;
      state.signupError = action.payload;
    },
  },
});

export const selectLoading = (state) => state.user.loading;
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;
