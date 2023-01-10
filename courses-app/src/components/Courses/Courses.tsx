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
import { FetchAllCourses } from '../../store/courses/asyncActions';
import { getCurrentUser } from '../../store/user/asyncActions';
import { selectAuthData } from '../../store/user/selectors';

export const Courses: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items } = useSelector(selectCoursesData);

  const { isAuth } = useAppSelector(selectAuthData);
  const [Search, setSearch] = React.useState<string>('');

  //FUNC

  React.useEffect(() => {
    if (isAuth) {
      dispatch(getCurrentUser());
    }
    if (!items.length) {
      dispatch(FetchAllCourses());
    }
  }, []);

  let inputHandler = (filter: string): void => {
    setSearch(filter.toLowerCase());
  };

  const getCourses = (courses: IList[]) => {
    if (courses.length === 0) {
      return <div>There is no courses yet</div>;
    }
    return courses.map((course) => {
      const courseTitle = course?.title?.toLowerCase();
      return courseTitle?.includes(Search) ? <CourseCard key={course.id} {...course} /> : <></>;
    });
  };

  const Allcourses = getCourses(items);

  return (
    <Container maxW="1220px">
      <SearchBar inputHandler={inputHandler}></SearchBar>
      {Allcourses}
    </Container>
  );
};
