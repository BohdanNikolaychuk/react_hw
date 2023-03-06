import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../utils/axios'
import { AuthorsAction } from './slice'

export const FetchAllAuthors = createAsyncThunk(
	'authors/fetchAllAuthors',
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await axios.get(`http://localhost:4000/authors/all`)

			return data.result
		} catch (err: any) {
			let error = err
			if (error.response.data) {
				throw rejectWithValue('Problems with authors')
			}
		}
	}
)

type authorsList = {
	name: string
}

export const FetchAddAuthors = createAsyncThunk(
	'authors/fetchAddAuthors',
	async (params: authorsList, { rejectWithValue, dispatch }) => {
		try {
			const res = await axios.post('http://localhost:4000/authors/add', params)

			dispatch(AuthorsAction.addAuthor(res.data.result))
			return res
		} catch (err: any) {
			let error = err
			if (error.response.data) {
				throw rejectWithValue('Problems with crate authors')
			}
		}
	}
)

export const FetchRemoveAuthors = createAsyncThunk(
	'authors/fetchRemoveAuthors',
	async (id: string, { rejectWithValue, dispatch }) => {
		try {
			const res = await axios.delete(`http://localhost:4000/authors/${id}`)
			dispatch(AuthorsAction.removeAuthor(id))
			return res
		} catch (err: any) {
			let error = err
			if (error.response.data) {
				throw rejectWithValue('Problems with crate authors')
			}
		}
	}
)
