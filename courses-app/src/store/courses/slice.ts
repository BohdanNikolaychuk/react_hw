import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { IList } from '../../@types/IList';

import { FetchAllCourses } from './asyncActions';
import { Status } from './types';

type State = {
  items: IList[];
  status: string;
};

const initialState: State = {
  items: [],
  status: Status.LOADING,
};

export const FetchAddCourse = createAsyncThunk(
  'courses/fetchAddCourse',
  async function (params: any, { rejectWithValue, dispatch }) {
    console.log(params);

    const res = await axios.post('http://localhost:4000​/courses​/add', params);
    console.log('🚀 ~ file: slice.ts:23 ~ res', res);
  },
);

const CoursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
    addTodo(state, action) {
      state.items.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(FetchAllCourses.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(FetchAllCourses.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(FetchAllCourses.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setItems } = CoursesSlice.actions;

export default CoursesSlice.reducer;
