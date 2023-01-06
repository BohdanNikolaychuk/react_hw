import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const FetchAllAuthors = createAsyncThunk('authors/fetchAllAuthors', async () => {
  const { data } = await axios.get(`http://localhost:4000/authors/all`);

  return data.result;
});
