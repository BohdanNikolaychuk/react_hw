import { createSlice } from '@reduxjs/toolkit';

import { IList } from '../../@types/IList';

import { FetchAddCourse, FetchAllCourses } from './asyncActions';
import { Status } from './types';

type State = {
  courses: IList[];
  status: string;
  error: string;
};

const initialState: State = {
  courses: [],
  status: Status.MAIN,
  error: '',
};

const CoursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    addCourse(state, action) {
      state.courses.push(action.payload);
    },
    removeCourse(state, action) {
      state.courses = state.courses.filter((todo) => todo.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(FetchAllCourses.pending, (state) => {
      state.status = Status.LOADING;
      state.courses = [];
    });

    builder.addCase(FetchAllCourses.fulfilled, (state, action) => {
      state.courses = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(FetchAllCourses.rejected, (state) => {
      state.status = Status.ERROR;
      state.courses = [];
    });
    builder.addCase(FetchAddCourse.pending, (state) => {
      state.status = Status.LOADING;
      state.courses = [];
    });

    builder.addCase(FetchAddCourse.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
    });

    builder.addCase(FetchAddCourse.rejected, (state) => {
      state.status = Status.ERROR;
      state.courses = [];
    });
  },
});

export const { addCourse, removeCourse } = CoursesSlice.actions;

export default CoursesSlice.reducer;
