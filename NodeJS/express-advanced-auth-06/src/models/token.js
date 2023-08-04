const { Schema, model } = require('mongoose')

const tokenSchema = new Schema({
	refreshToken: {
		type: String,
		required: true
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
})

const Token = model('Token', tokenSchema)

module.exports = Token
