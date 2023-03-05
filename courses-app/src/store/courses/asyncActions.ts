import { createAsyncThunk } from '@reduxjs/toolkit';
import { addCourse, removeCourse } from './slice';
import axios from '../../utils/axios';
import { IList } from '../../@types';

export const FetchAllCourses = createAsyncThunk('courses/fetchAllCourses', async () => {
  try {
    const { data } = await axios.get(`http://localhost:4000/courses/all`);

    return data.result;
  } catch (err) {}
});

export const FetchAddCourse = createAsyncThunk(
  'courses/fetchAddCourse',
  async function (params: IList, { rejectWithValue, dispatch }) {
    try {
      const res = await axios.post('http://localhost:4000/courses/add', params);
      dispatch(addCourse(params));
      return res;
    } catch (err: any) {
      let error = err;

      if (error.response) {
        throw rejectWithValue(error.response.data);
      }
    }
  },
);

export const FetchDeleteCourse = createAsyncThunk(
  'courses/fetchDeleteCourse',
  async (courseId: string, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.delete(`http://localhost:4000/courses/${courseId}`);
      dispatch(removeCourse(courseId));
    } catch (err: any) {
      let error = err;

      if (error.response) {
        throw rejectWithValue(error.response.data);
      }
    }
  },
);

export const FetchCourseByID = createAsyncThunk(
  'courses/fetchCourseByID',
  async (courseId: string, { rejectWithValue }) => {
    try {
      const res = await axios.get(`http://localhost:4000/courses/${courseId}`);
    } catch (err: any) {
      let error = err;

      if (error.response) {
        throw rejectWithValue(error.response.data);
      }
    }
  },
);

export const FetchCourseUpdate = createAsyncThunk(
  'courses/fetchCourseUpdate',
  async (data: any, { rejectWithValue }) => {
    const { courseId, updateCourse } = data;

    try {
      const res = await axios.put(`http://localhost:4000/courses/${courseId}`, updateCourse);
      console.log(res);
    } catch (err: any) {
      let error = err;

      if (error.response) {
        throw rejectWithValue(error.response.data);
      }
    }
  },
);
