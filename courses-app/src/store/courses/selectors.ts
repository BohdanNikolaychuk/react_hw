import { createSelector } from '@reduxjs/toolkit'
import { IList } from '../../@types'
import { RootStore } from '../store'

export const selectCoursesData = (state: RootStore) => state.courses

export const selectIdEntity = (id: string) => {
	return createSelector(selectCoursesData, state =>
		state.courses.find((art: IList) => art.id === id)
	)
}
