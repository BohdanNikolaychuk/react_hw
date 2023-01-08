import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from './_Routes';
import { Layout } from '../components/Layout/Layout';
import { Login } from '../pages/Login/Login';
import { Register } from '../pages/Register/Register';
import { CourseInfo } from './../pages/CourseInfo/CourseInfo';
import { CreateCourse } from '../pages/CreateCourse/CreateCourse';
import { Home } from '../pages/Home/Home';
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
