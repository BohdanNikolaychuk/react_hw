import { configureStore } from '@reduxjs/toolkit'

import authors from './authors/slice'
import courses from './courses/slice'
import auth from './user/slice'

export const store = configureStore({
	reducer: {
		courses,
		authors,
		auth,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
})

export type RootStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
