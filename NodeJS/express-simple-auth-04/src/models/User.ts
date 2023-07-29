import { Schema, model } from 'mongoose'
import IUser from '../types/IUser'

const userSchema = new Schema<IUser>({
	username: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	roles: [
		{
			type: String,
			ref: 'Role'
		}
	]
})

const User = model<IUser>('User', userSchema)

export default User
