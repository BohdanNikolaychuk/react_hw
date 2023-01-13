import React from 'react';
// ui
import { Container } from '@chakra-ui/react';

//components
import { SearchBar } from './components/SearchBar/SeatchBar';
import { CourseCard } from './components/CourseCard/CourseCard';

// types
import { IList } from '../../@types/IList';
// store
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useSelector } from 'react-redux';
import { selectCoursesData } from '../../store/courses/selectors';

import { selectAuthData } from '../../store/user/selectors';
import { Loading } from '../Loading/Loading';

export const Courses: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, status } = useSelector(selectCoursesData);

  const { isAuth } = useAppSelector(selectAuthData);
  const [Search, setSearch] = React.useState<string>('');

  //FUNC

  const ShowLoading = (status: string) => {
    if (status === 'loading') {
      return <Loading></Loading>;
    }
  };

  let inputHandler = (filter: string): void => {
    setSearch(filter.toLowerCase());
  };

  const getCourses = (courses: IList[]) => {
    if (courses?.length === 0) {
      return <>There is no courses yet</>;
    }
    return courses.map((course) => {
      const courseTitle = course?.title?.toLowerCase();
      return courseTitle?.includes(Search) ? <CourseCard key={course.id} {...course} /> : <></>;
    });
  };

  const Allcourses = getCourses(items);
  const showLoading = ShowLoading(status);

  return (
    <Container maxW="1220px">
      <SearchBar inputHandler={inputHandler}></SearchBar>
      {showLoading}
      {Allcourses}
    </Container>
  );
};
