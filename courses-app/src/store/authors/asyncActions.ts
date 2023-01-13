import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { addAuthor, removeAuthor } from './slice';

export const FetchAllAuthors = createAsyncThunk(
  'authors/fetchAllAuthors',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`http://localhost:4000/authors/all`);

      return data.result;
    } catch (err: any) {
      let error = err;
      if (error.response.data) {
        throw rejectWithValue('Problems with authors');
      }
    }
  },
);

type authorsList = {
  name: string;
};

export const FetchAddAuthors = createAsyncThunk(
  'authorts/fetchAddAuthors',
  async (params: authorsList, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post('http://localhost:4000/authors/add', params);

      dispatch(addAuthor(res.data.result));

    } catch (err: any) {
      let error = err;
      if (error.response.data) {
        throw rejectWithValue('Problems with crate authors');
      }
    }
  },
);

export const FetchRemoveAuthors = createAsyncThunk(
  'authorts/fetchRemoveAuthors',
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.delete(`http://localhost:4000/authors/${id}`);
      dispatch(removeAuthor(id));
      return res;
    } catch (err: any) {
      let error = err;
      if (error.response.data) {
        throw rejectWithValue('Problems with crate authors');
      }
    }
  },
);
