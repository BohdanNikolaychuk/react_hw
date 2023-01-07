import axios from '../../utils/axios';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { ILogin, IRegistration } from '../../@types/IAuth';

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }: IRegistration, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      await axios.post(`register`, { name, email, password }, config);
    } catch (error) {
      // if (error.response && error.response.data.message) {
      //   return rejectWithValue(error.response.data.message);
      // } else {
      //   return rejectWithValue(error.message);
      // }
      console.log(error);
    }
  },
);

export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password }: ILogin, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(`login`, { email, password }, config);

      localStorage.setItem('userToken', data.result);
      return data;
    } catch (error) {
      // // return custom error message from API if any
      // if (error.response && error.response.data.message) {
      //   return rejectWithValue(error.response.data.message);
      // } else {
      //   return rejectWithValue(error.message);
      // }
    }
  },
);

export const getCurrentUser = createAsyncThunk('auth/me', async () => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const data = await axios.get(`users/me`, config);
    console.log(data);

    return data;
  } catch (error) {
    // // return custom error message from API if any
    // if (error.response && error.response.data.message) {
    //   return rejectWithValue(error.response.data.message);
    // } else {
    //   return rejectWithValue(error.message);
    // }
  }
});
