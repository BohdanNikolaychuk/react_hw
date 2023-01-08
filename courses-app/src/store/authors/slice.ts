import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthors } from '../../@types/IAuthors';

import { FetchAllAuthors } from './asyncActions';
import { Status } from './types';

type State = {
  authorsList: IAuthors[];
  status: string;
};

const initialState: State = {
  authorsList: [],
  status: Status.LOADING,
};

const AuthorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {
    addAuthor(state, action) {
      state.authorsList.push(action.payload);
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
      state.authorsList = [];
    });
  },
});

export const { addAuthor } = AuthorsSlice.actions;

export default AuthorsSlice.reducer;
