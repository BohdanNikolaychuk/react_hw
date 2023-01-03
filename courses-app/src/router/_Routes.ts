export const ROUTES = {
  courses: '',
  course: (courseId = null) => (courseId ? `/course/:${courseId}` : `/course/:courseId`),
  login: '/login',
  register: '/register',
  create: 'course/create',
};
