import { model, Schema } from 'mongoose'
import IRole from '../types/IRole'

const roleSchema = new Schema<IRole>({
	value: {
		type: String,
		unique: true,
		required: true,
		default: 'USER'
	}
})

const Role = model<IRole>('Role', roleSchema)
export default Role
