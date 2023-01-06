import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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

const CoursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(FetchAllCourses.pending, (state, action: PayloadAction) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(FetchAllCourses.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(FetchAllCourses.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setItems } = CoursesSlice.actions;

export default CoursesSlice.reducer;
