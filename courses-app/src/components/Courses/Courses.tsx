import React from 'react';
import { SearchBar } from './components/SearchBar/SeatchBar';
import { CourseCard } from './components/CourseCard/CourseCard';
import { Container } from '@chakra-ui/react';
import { mockedCoursesList } from '../../constant/constant';

import { IList } from '../../@types/IList';

export const Courses: React.FC = () => {
  const [courses, setCourses] = React.useState<IList[]>(mockedCoursesList);
  const [Search, setSearch] = React.useState<string>('');

  let inputHandler = (filter: string): void => {
    setSearch(filter.toLowerCase());
  };

  const getCourses = (courses: IList[]) => {
    if (courses.length === 0) {
      return <div>There is no courses yet</div>;
    }
    return courses.map((course) => {
      const courseId = course?.id?.toLowerCase();
      const courseTitle = course?.title?.toLowerCase();
      return courseId?.includes(Search) || courseTitle?.includes(Search) ? (
        <CourseCard key={course.id} {...course} />
      ) : (
        <></>
      );
    });
  };

  const items = getCourses(courses);
  return (
    <Container maxW="1220px">
      <SearchBar inputHandler={inputHandler}></SearchBar>
      {items}
    </Container>
  );
};
