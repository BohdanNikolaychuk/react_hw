import React from 'react';
import { SearchBar } from './components/SearchBar/SearchBar';
import { CourseCard } from './components/CourseCard/CourseCard';
import { Container } from '@chakra-ui/react';
import { mockedCoursesList } from './../../constant/constant';
export const Courses = () => {
	const [courses, setCourses] = React.useState(mockedCoursesList);
	const [Search, setSearch] = React.useState('');

	let inputHandler = (e) => {
		//convert input text to lower case
		var lowerCase = e.target.value.toLowerCase();

		setSearch(lowerCase);
	};

	const getCourses = (courses) => {
		if (courses.length === 0) {
			return <div>There is no courses yet</div>;
		}
		return courses.map((course) => {
			const courseId = course.id.toLowerCase().trim();
			const courseTitle = course.title.toLowerCase().trim();
			return courseId.includes(Search) || courseTitle.includes(Search) ? (
				<CourseCard key={course.id} {...course} />
			) : (
				<></>
			);
		});
	};

	const items = getCourses(courses);
	return (
		<Container maxW='1220px'>
			<SearchBar inputHandler={inputHandler}></SearchBar>
			{items}
		</Container>
	);
};
