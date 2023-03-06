import { configureStore } from '@reduxjs/toolkit'

import { AuthorsReducer } from './authors/slice'
import { CoursesReducer } from './courses/slice'
import { AuthReducer } from './user/slice'

export const store = configureStore({
	reducer: {
		courses: CoursesReducer,
		authors: AuthorsReducer,
		auth: AuthReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
})

export type RootStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
