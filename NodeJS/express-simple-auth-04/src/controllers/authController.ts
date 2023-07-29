import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import Role from '../models/Role.js'
import User from '../models/User.js'

const generateAccessToken = (userId: string, userRoles: string[]) => {
	const payload = {
		id: userId,
		roles: userRoles
	}
	const secretKey = process.env.SECRET_KEY

	if (!secretKey) {
		throw new Error('Secret key is not defined')
	}

	return jwt.sign(payload, secretKey, { expiresIn: '24h' })
}

class AuthController {
	async register(req: Request, res: Response) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json(errors.array())
			}
			const { username, password } = req.body
			const candidateUser = await User.findOne({ username })
			if (candidateUser) {
				return res.status(400).json({ message: `User ${username} already exists` })
			}
			const hashedPassword = bcrypt.hashSync(password, 7)

			const userRole = await Role.findOne({ value: 'USER' })
			const newUser = new User({
				username,
				password: hashedPassword,
				roles: [userRole?.value]
			})
			const createdUser = await newUser.save()
			return res.json(createdUser)
		} catch (e: unknown) {
			console.log(e)
			res.status(400).json({ message: (e as Error).message })
		}
	}

	async login(req: Request, res: Response) {
		try {
			const { username, password } = req.body
			const user = await User.findOne({ username })
			if (!user) {
				return res.status(400).json({ message: `User ${username} not found` })
			}
			const isPasswordValid = bcrypt.compareSync(password, user.password)
			if (!isPasswordValid) {
				return res.status(400).json({ message: `Invalid password` })
			}
			const token = generateAccessToken(user._id.toString(), user.roles)
			return res.json({ token })
		} catch (e) {
			console.log(e)
			res.status(400).json({ message: (e as Error).message })
		}
	}

	async getUsers(req: Request, res: Response) {
		try {
			const users = await User.find()
			res.json(users)
		} catch (e) {
			console.log(e)
			res.status(400).json({ message: (e as Error).message })
		}
	}
}

export default new AuthController()
