export const ROUTES = {
	main: '/',
	course: (courseId = null) =>
		courseId ? `/course/:${courseId}` : `/course/:courseId`,
	login: '/login',
	register: '/register',
	create: 'course/create',
	update: (courseId = null) =>
		courseId ? `/course/update/:${courseId}` : `/course/update/:courseId`,
}
