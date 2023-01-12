import { createSlice } from '@reduxjs/toolkit';

import { IList } from '../../@types/IList';

import { FetchAddCourse, FetchAllCourses } from './asyncActions';
import { Status } from './types';

type State = {
  items: IList[];
  status: string;
  error: string;
};

const initialState: State = {
  items: [],
  status: Status.MAIN,
  error: '',
};

const CoursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    addCourse(state, action) {
      state.items.push(action.payload);
    },
    removeCourse(state, action) {
      state.items = state.items.filter((todo) => todo.id !== action.payload);
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
    builder.addCase(FetchAddCourse.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(FetchAddCourse.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
    });

    builder.addCase(FetchAddCourse.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { addCourse, removeCourse } = CoursesSlice.actions;

export default CoursesSlice.reducer;
