import axios from '../../utils/axios'

import { createAsyncThunk } from '@reduxjs/toolkit'
import { ILogin, IRegistration } from '../../@types/IAuth'
import { AuthActions } from './slice'

export const registerUser = createAsyncThunk(
	'auth/register',
	async ({ name, email, password }: IRegistration, { rejectWithValue }) => {
		try {
			await axios.post(`register`, { name, email, password })
		} catch (err: any) {
			let error = err
			if (!error.response) {
				throw err
			}

			throw rejectWithValue(error.response.data.result)
		}
	}
)

export const userLogin = createAsyncThunk(
	'auth/login',
	async (UserData: ILogin, { rejectWithValue }) => {
		try {
			const { data } = await axios.post(`login`, UserData)
			console.log(data)

			localStorage.setItem('userToken', data.result)
			return data
		} catch (err: any) {
			let error = err
			if (error.response.data.errors) {
				throw rejectWithValue(error.response.data.errors[0])
			}
			if (error.response.data.result) {
				throw rejectWithValue(error.response.data.result)
			}
		}
	}
)

export const getCurrentUser = createAsyncThunk(
	'auth/me',
	async (_, { dispatch }) => {
		try {
			const data = await axios.get(`users/me`)
			return data
		} catch (err: any) {
			dispatch(AuthActions.logout())
		}
	}
)

export const LogOut = createAsyncThunk('auth/LogOut', async () => {
	try {
		const data = await axios.delete(`/logout`)
		localStorage.clear()
		return data
	} catch (err: any) {
		let error = err
		if (error.response.data) {
			localStorage.clear()
		}
	}
})
