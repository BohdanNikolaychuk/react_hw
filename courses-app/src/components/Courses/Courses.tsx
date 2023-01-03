import React from 'react';
import { SearchBar } from './components/SearchBar/SeatchBar';
import { CourseCard } from './components/CourseCard/CourseCard';
import { Container } from '@chakra-ui/react';
import { mockedCoursesList } from '../../constant/constant';
import { Box, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

import { IList } from '../../@types/IList';
import { useAuth } from '../../context/authContext';

export const Courses: React.FC = () => {
  const [courses, setCourses] = React.useState<IList[]>(mockedCoursesList);
  const [Search, setSearch] = React.useState<string>('');
  const { isAuth } = useAuth();

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
      {isAuth ? (
        items
      ) : (
        <>
          <Box padding="6" boxShadow="lg" bg="white">
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
          </Box>
          <Box padding="6" boxShadow="lg" bg="white">
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
          </Box>
          <Box padding="6" boxShadow="lg" bg="white">
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
          </Box>
        </>
      )}
    </Container>
  );
};
