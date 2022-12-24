
import { Layout } from './components/Layout/Layout';

import { Routes, Route } from 'react-router-dom';
import {Courses} from './components/Courses/Courses';
import CourseInfo from './pages/CourseInfo/CourseInfo';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { CreateCourse } from './pages/CreateCourse/CreateCourse';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Courses />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/create" element={<CreateCourse />} />
          <Route path="/courses/:courseId" element={<CourseInfo />} />
        </Route>
      </Routes>
    </>
  );
}

export default App
