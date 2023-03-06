import { createSlice } from '@reduxjs/toolkit'

import { IList } from '../../@types/IList'

import { FetchAddCourse, FetchAllCourses } from './asyncActions'

type State = {
	courses: IList[]
	status: 'init' | 'loading' | 'error' | 'success'
}

const initialState: State = {
	courses: [],
	status: 'init',
}

const CoursesSlice = createSlice({
	name: 'courses',
	initialState,
	reducers: {
		addCourse(state, action) {
			state.courses.push(action.payload)
		},
		removeCourse(state, action) {
			state.courses = state.courses.filter(todo => todo.id !== action.payload)
		},
	},
	extraReducers: builder => {
		builder
			.addCase(FetchAllCourses.pending, state => {
				state.status = 'loading'
				state.courses = []
			})

			.addCase(FetchAllCourses.fulfilled, (state, action) => {
				state.courses = action.payload
				state.status = 'success'
			})

			.addCase(FetchAllCourses.rejected, state => {
				state.status = 'error'
				state.courses = []
			})
			//Add course
			.addCase(FetchAddCourse.pending, state => {
				state.status = 'loading'
				state.courses = []
			})

			.addCase(FetchAddCourse.fulfilled, (state, action) => {
				state.status = 'success'
			})
			.addCase(FetchAddCourse.rejected, state => {
				state.status = 'error'
				state.courses = []
			})
	},
})

export const { reducer: CoursesReducer, actions: CoursesAction } = CoursesSlice
