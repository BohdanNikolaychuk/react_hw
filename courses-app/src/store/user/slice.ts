import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getCurrentUser, LogOut, registerUser, userLogin } from './asyncActions'
import { State, SuccessUser } from './types'

const initialState: State = {
	isAuth: null,
	userName: null,
	userEmail: null,
	role: null,
	status: 'init',
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: state => {
			initialState
			localStorage.removeItem('userToken')
		},
	},
	extraReducers: builder => {
		builder.addCase(registerUser.pending, state => {
			state.status = 'loading'
		})

		builder.addCase(registerUser.fulfilled, state => {
			state.status = 'success'
		})

		builder.addCase(registerUser.rejected, state => {
			state.status = 'error'
		})
		// LOGIN
		builder.addCase(userLogin.pending, state => {
			state.status = 'loading'
		})

		builder.addCase(
			userLogin.fulfilled,
			(state, action: PayloadAction<SuccessUser>) => {
				state.status = 'success'
				state.userName = action.payload.user.name
				state.userEmail = action.payload.user.email
				state.role = action.payload.user.role
				state.isAuth = true
			}
		)

		builder.addCase(userLogin.rejected, (state, action) => {
			state.status = 'error'
			state.isAuth = false
		})
		// CURRENT USER
		builder.addCase(getCurrentUser.pending, state => {
			state.status = 'loading'
		})

		builder.addCase(getCurrentUser.fulfilled, (state, action) => {
			state.status = 'success'
			state.userName = action.payload?.data.result.name
			state.userEmail = action.payload?.data.result.email
			state.role = action.payload?.data.result.role
			state.isAuth = true
		})

		builder.addCase(getCurrentUser.rejected, (state, action) => {
			state.status = 'error'
			state.isAuth = false
		})
		// LOGOUT
		builder.addCase(LogOut.pending, state => {
			state.status = 'loading'
		})

		builder.addCase(LogOut.fulfilled, (state, action) => {
			state.status = 'success'
			state.isAuth = false
			state.userName = ''
			state.userEmail = ''
			state.role = ''
		})

		builder.addCase(LogOut.rejected, (state, action) => {
			state.status = 'error'
		})
	},
})

export const { reducer: AuthReducer, actions: AuthActions } = authSlice
