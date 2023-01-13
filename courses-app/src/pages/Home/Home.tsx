import React from 'react';
import { FetchAllAuthors } from '../../store/authors/asyncActions';
import { FetchAllCourses } from '../../store/courses/asyncActions';
import { useAppDispatch  } from '../../store/store';
import { getCurrentUser } from '../../store/user/asyncActions';
import { Courses } from './../../components/Courses/Courses';

export const Home = () => {

const dispatch = useAppDispatch();
React.useEffect(() => {
  dispatch(getCurrentUser());
  dispatch(FetchAllCourses());
  dispatch(FetchAllAuthors());
}, []);

  return <Courses></Courses>;
};
