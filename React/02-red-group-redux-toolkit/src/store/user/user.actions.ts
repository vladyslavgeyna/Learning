import { createAsyncThunk } from '@reduxjs/toolkit'
import { IUser } from '../../types/user.types'

const fetchUserById = (userId: number): Promise<IUser> => {
	return new Promise((resolve, reject) =>
		setTimeout(
			() =>
				resolve({
					id: 1,
					name: 'John Doe'
				}),
			1000
		)
	)
}

export const getUserById = createAsyncThunk<IUser, number>(
	'users/getUserById',
	async (userId, thunkApi) => {
		try {
			const response = await fetchUserById(userId)
			return response
		} catch (e) {
			return thunkApi.rejectWithValue(e)
		}
	}
)
