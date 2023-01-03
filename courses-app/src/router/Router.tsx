import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from './_Routes';
import { Courses } from '../components/Courses/Courses';
import { Layout } from '../components/Layout/Layout';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import CourseInfo from './../pages/CourseInfo/CourseInfo';
import { CreateCourse } from '../pages/CreateCourse/CreateCourse';
export const router = createBrowserRouter([
  {
    path: ROUTES.courses,
    element: <Layout />,

    children: [
      {
        index: true,
        element: <Courses />,
      },
      {
        element: <CourseInfo />,
        path: ROUTES.course(),
      },
      {
        element: <Login />,
        path: ROUTES.login,
      },
      {
        element: <Register />,
        path: ROUTES.register,
      },
      {
        element: <CreateCourse />,
        path: ROUTES.create,
      },
    ],
  },
]);
