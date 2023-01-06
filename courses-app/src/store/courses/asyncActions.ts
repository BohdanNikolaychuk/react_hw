import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const FetchAllCourses = createAsyncThunk('courses/fetchAllCourses', async () => {
  const { data } = await axios.get(`http://localhost:4000/courses/all`);

  return data.result;
});
