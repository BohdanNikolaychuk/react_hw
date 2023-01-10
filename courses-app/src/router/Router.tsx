import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from './_Routes';
import { Layout } from '../components/Layout/Layout';

import { Home, CreateCourse, CourseInfo, Register, Login } from '../pages';
import { ProtectedRoute } from '../components/ProtectedRoute/ProtectedRoute';

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
        element: (
          <ProtectedRoute>
            <CreateCourse />
          </ProtectedRoute>
        ),
        path: ROUTES.create,
      },
    ],
  },
]);
