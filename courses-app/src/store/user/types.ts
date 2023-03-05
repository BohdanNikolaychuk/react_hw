export type SuccessUser = {
	user: { name: string; email: string; role: string }
}

export type State = {
	isAuth: null | boolean
	userName: null | string
	userEmail: null | string
	status: 'init' | 'loading' | 'error' | 'success'
	role: null | string
}
