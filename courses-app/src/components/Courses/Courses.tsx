import React from 'react'
// ui
import { Container } from '@chakra-ui/react'

//components
import { CourseCard } from './components/CourseCard/CourseCard'
import { SearchBar } from './components/SearchBar/SeatchBar'

// types
import { IList } from '../../@types/IList'
// store

import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks'
import { Loading } from '../Loading/Loading'

export const Courses: React.FC = () => {
	const dispatch = useAppDispatch()
	const courses = useAppSelector(state => state.courses.courses)
	const status = useAppSelector(state => state.courses.status)
	const isAuth = useAppSelector(state => state.auth.isAuth)
	const [Search, setSearch] = React.useState<string>('')

	//FUNC

	const ShowLoading = (status: string) => {
		if (status === 'loading') {
			return <Loading></Loading>
		}
	}

	let inputHandler = (filter: string): void => {
		setSearch(filter.toLowerCase())
	}

	const getCourses = (courses: IList[]) => {
		if (courses?.length === 0) {
			return <>There is no courses yet</>
		}
		return courses.map(course => {
			const courseTitle = course?.title?.toLowerCase()
			return (
				courseTitle?.includes(Search) && (
					<CourseCard key={course.id} {...course} />
				)
			)
		})
	}

	const AllCourses = getCourses(courses)
	const showLoading = ShowLoading(status)

	return (
		<Container maxW='1220px'>
			<SearchBar inputHandler={inputHandler}></SearchBar>
			{showLoading}
			{AllCourses}
		</Container>
	)
}
