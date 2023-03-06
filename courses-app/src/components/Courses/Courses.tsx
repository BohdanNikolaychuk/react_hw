import React from 'react'
// ui
import { Container } from '@chakra-ui/react'

//components
import { SearchBar } from './components/SearchBar/SearchBar'

// types
// store

import { IList } from '../../@types'
import { useAppSelector } from '../../hooks/redux.hooks'
import { Loading } from '../Loading/Loading'
import { CourseCard } from './components/CourseCard/CourseCard'

export const Courses: React.FC = () => {
	const courses = useAppSelector(state => state.courses.courses)
	const status = useAppSelector(state => state.courses.status)

	const [Search, setSearch] = React.useState<string>('')

	//FUNC

	const ShowLoading = (status: string) => {
		if (status === 'loading' || status === 'init') {
			return <Loading></Loading>
		}
	}

	let inputHandler = (filter: string): void => {
		setSearch(filter.toLowerCase())
	}

	const getCourses = (courses: IList[]) => {
		return courses.map(course => {
			const courseTitle = course?.title?.toLowerCase()
			return (
				courseTitle?.includes(Search) && (
					<CourseCard key={course.id} {...course} />
				)
			)
		})
	}

	return (
		<Container maxW='1220px'>
			<SearchBar inputHandler={inputHandler}></SearchBar>
			{ShowLoading(status)}
			{getCourses(courses)}
		</Container>
	)
}
