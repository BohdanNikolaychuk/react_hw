import React from 'react'
import { useAppDispatch } from '../../hooks/redux.hooks'
import { FetchAllAuthors } from '../../store/authors/asyncActions'
import { FetchAllCourses } from '../../store/courses/asyncActions'

import { getCurrentUser } from '../../store/user/asyncActions'
import { Courses } from './../../components/Courses/Courses'

export const Home = () => {
	const dispatch = useAppDispatch()
	React.useEffect(() => {
		if (localStorage.getItem('userToken')) {
			dispatch(getCurrentUser())
		}

		dispatch(FetchAllCourses())
		dispatch(FetchAllAuthors())
	}, [])

	return <Courses></Courses>
}
