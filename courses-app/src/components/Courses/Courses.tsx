import React from 'react';
import { SearchBar } from './components/SearchBar/SeatchBar';
import { CourseCard } from './components/CourseCard/CourseCard';
import { Container } from '@chakra-ui/react';
import { Box, SkeletonText } from '@chakra-ui/react';

import { IList } from '../../@types/IList';
import { useAuth } from '../../context/authContext';
import { useAppDispatch } from '../../store/store';
import { useSelector } from 'react-redux';
import { selectCoursesData } from '../../store/courses/selectors';
import { FetchAllCourses } from '../../store/courses/asyncActions';

export const Courses: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, status } = useSelector(selectCoursesData);
  const { isAuth } = useAuth();

  const [Search, setSearch] = React.useState<string>('');

  //FUNC

  const getAllCourses = () => {
    dispatch(FetchAllCourses());
  };

  React.useEffect(() => {
    getAllCourses();
  }, []);

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

  // const skeleton = [...new Array(3)].map((_, idex) => {
  //   <Box padding="6" boxShadow="lg" bg="white">
  //     <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
  //     <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
  //   </Box>;
  // });

  const Allcourses = getCourses(items);

  return (
    <Container maxW="1220px">
      <SearchBar inputHandler={inputHandler}></SearchBar>
      {isAuth ? (
        Allcourses
      ) : (
        <Box padding="6" boxShadow="lg" bg="white">
          <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
        </Box>
      )}
    </Container>
  );
};
