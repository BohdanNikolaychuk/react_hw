import React from 'react';
import { SearchBar } from './components/SearchBar/SeatchBar';
import { CourseCard } from './components/CourseCard/CourseCard';
import { Container } from '@chakra-ui/react';
import { mockedCoursesList } from '../../constant/constant';
import { CreateCourse } from './components/CreateCourse/CreateCourse';

import { IList } from '../../@types/IList';

export const Courses = () => {
  const [courses, setCourses] = React.useState<IList[]>(mockedCoursesList);
  const [Search, setSearch] = React.useState<string>('');
  const [addCourse, setAddCourse] = React.useState<boolean>(false);
  let inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toLowerCase());
  };

  const handleAddCourse = (newCourse: IList):void => {
    console.log(newCourse);
    setCourses([...courses, newCourse]);
  };

  const handleOpenModal = (): void => {
    setAddCourse(!addCourse);
  };

  const getCourses = (courses: IList[]) => {
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
    <Container maxW="1220px">
      {addCourse ? (
        <CreateCourse
          handleAddCourse={handleAddCourse}
          handleOpenModal={handleOpenModal}></CreateCourse>
      ) : (
        <>
          <SearchBar handleOpenModal={handleOpenModal} inputHandler={inputHandler}></SearchBar>
          {items}
        </>
      )}
    </Container>
  );
};
