import { Layout } from './components/Layout/Layout';

import { RouterProvider } from 'react-router-dom';
import { Courses } from './components/Courses/Courses';
import CourseInfo from './pages/CourseInfo/CourseInfo';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { CreateCourse } from './pages/CreateCourse/CreateCourse';
import { router } from './router/Router';

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
