const User = require('../models/user')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const emailService = require('./emailService')
const tokenService = require('./tokenService')
const UserDto = require('../dtos/userDto.js')
const ApiError = require('../utils/apiError.js')

class UserService {
	async register(email, password) {
		const candidate = await User.findOne({ email })

		if (candidate) {
			throw ApiError.BadRequest(`User with email ${email} already exists`)
		}

		const hashedPassword = await bcrypt.hash(password, 3)
		const activationLink = uuid.v4()
		const user = await User.create({
			email,
			password: hashedPassword,
			activationLink
		})

		const link = `${process.env.API_URL}/api/account/activate/${activationLink}`
		await emailService.sendActivationEmail(email, link)

		const userDto = new UserDto(user)
		const tokens = tokenService.generateTokens({ ...userDto })
		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		return {
			...tokens,
			user: userDto
		}
	}

	async activate(activationLink) {
		const user = await User.findOne({ activationLink })

		if (!user) {
			throw ApiError.BadRequest('Incorrect activation link')
		}

		user.isActivated = true
		await user.save()
	}

	async login(email, password) {
		const user = await User.findOne({ email })
		if (!user) {
			throw ApiError.BadRequest(`User with email ${email} was not found`)
		}

		const arePasswordsEquals = await bcrypt.compare(password, user.password)
		if (!arePasswordsEquals) {
			throw ApiError.BadRequest(`Incorrect password`)
		}

		const userDto = new UserDto(user)
		const tokens = tokenService.generateTokens({ ...userDto })

		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		return {
			...tokens,
			user: userDto
		}
	}

	async logout(refreshToken) {
		const token = await tokenService.removeToken(refreshToken)
		return token
	}

	async refresh(refreshToken) {
		if (!refreshToken) {
			throw ApiError.UnauthorizedError()
		}

		const userData = tokenService.validateRefreshToken(refreshToken)
		const tokenFromDB = await tokenService.findToken(refreshToken)

		if (!userData || !tokenFromDB) {
			throw ApiError.UnauthorizedError()
		}

		const user = await User.findById(userData.id)
		const userDto = new UserDto(user)
		const tokens = tokenService.generateTokens({ ...userDto })

		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		return {
			...tokens,
			user: userDto
		}
	}

	async getAllUsers() {
		const users = await User.find()
		return users
	}
}

module.exports = new UserService()
