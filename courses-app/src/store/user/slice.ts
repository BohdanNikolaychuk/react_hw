import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { string } from 'yup';
import { getCurrentUser, registerUser, userLogin } from './asyncActions';
import { Status } from './types';

const userToken = localStorage.getItem('userToken') ? localStorage.getItem('userToken') : null;

type State = {
  isAuth: boolean;
  userName: string;
  userEmail: string;
  userToken?: string | null;
  status: string;
};

const initialState: State = {
  isAuth: !!userToken,
  userName: '',
  userEmail: '',
  userToken,
  status: Status.LOADING,
};

type SuccsesUser = {
  user: { name: string; email: string };
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.status = Status.LOADING;
    });

    builder.addCase(registerUser.fulfilled, (state) => {
      state.status = Status.SUCCESS;
    });

    builder.addCase(registerUser.rejected, (state) => {
      state.status = Status.ERROR;
    });

    builder.addCase(userLogin.pending, (state) => {
      state.status = Status.LOADING;
    });

    builder.addCase(userLogin.fulfilled, (state, action: PayloadAction<SuccsesUser>) => {
      state.status = Status.SUCCESS;

      state.userName = action.payload.user.name;
      state.userEmail = action.payload.user.email;
      state.isAuth = true;
    });

    builder.addCase(userLogin.rejected, (state) => {
      state.status = Status.ERROR;
      state.isAuth = false;
    });

    builder.addCase(getCurrentUser.pending, (state) => {
      state.status = Status.LOADING;
    });

    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.userName = action.payload?.data.result.name;

      state.isAuth = true;
    });

    builder.addCase(getCurrentUser.rejected, (state) => {
      state.status = Status.ERROR;
      state.isAuth = false;
    });
  },
});

export default authSlice.reducer;