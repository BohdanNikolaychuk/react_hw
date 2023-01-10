import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from './_Routes';
import { Layout } from '../components/Layout/Layout';

import { Home, CreateCourse, CourseInfo, Register, Login } from '../pages';
export const router = createBrowserRouter([
  {
    path: ROUTES.courses,
    element: <Layout />,

    children: [
      {
        index: true,
        element: <Home />,
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
