import { createSlice } from '@reduxjs/toolkit'

import { FetchAllAuthors } from './asyncActions'
import { State } from './types'

const initialState: State = {
	authorsList: [],
	status: 'init',
}

const AuthorsSlice = createSlice({
	name: 'authors',
	initialState,
	reducers: {
		addAuthor(state, action) {
			state.authorsList.push(action.payload)
		},
		removeAuthor(state, action) {
			state.authorsList = state.authorsList.filter(
				author => author.id !== action.payload
			)
		},
	},
	extraReducers: builder => {
		builder.addCase(FetchAllAuthors.pending, (state, action) => {
			state.status = 'loading'
			state.authorsList = []
		})

		builder.addCase(FetchAllAuthors.fulfilled, (state, action) => {
			state.authorsList = action.payload
			state.status = 'success'
		})

		builder.addCase(FetchAllAuthors.rejected, (state, action) => {
			state.status = 'error'
		})
	},
})

export const { reducer: AuthorsReducer, actions: AuthorsAction } = AuthorsSlice
