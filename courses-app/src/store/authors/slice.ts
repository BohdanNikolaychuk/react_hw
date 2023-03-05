import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FetchAllAuthors } from './asyncActions';
import { State, Status } from './types';

const initialState: State = {
  authorsList: [],
  status: Status.LOADING,
  error: '',
};

const AuthorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {
    addAuthor(state, action) {
      console.log(action.payload);

      state.authorsList.push(action.payload);
    },
    removeAuthor(state, action) {
      state.authorsList = state.authorsList.filter((author) => author.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(FetchAllAuthors.pending, (state, action) => {
      state.status = Status.LOADING;
      state.authorsList = [];
    });

    builder.addCase(FetchAllAuthors.fulfilled, (state, action) => {
      state.authorsList = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(FetchAllAuthors.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.error = action.payload as string;
      state.authorsList = [];
    });
  },
});

export const { addAuthor, removeAuthor } = AuthorsSlice.actions;

export default AuthorsSlice.reducer;
