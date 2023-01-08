export const ROUTES = {
  courses: '',
  main: '/',
  course: (courseId = null) => (courseId ? `/course/:${courseId}` : `/course/:courseId`),
  login: '/login',
  register: '/register',
  create: 'course/create',
};
