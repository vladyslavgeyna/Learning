import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import IUser from '../types/IUser'

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	if (req.method === 'OPTIONS') {
		next()
	}
	try {
		const token = req.headers.authorization?.split(' ')[1]
		if (!token) {
			return res.status(403).json('Not authorized')
		}

		const secretKey = process.env.SECRET_KEY

		if (!secretKey) {
			return res.status(500).json('Server error...')
		}
		const decodedData = jwt.verify(token, secretKey)
		//@ts-ignore
		req.user = decodedData as IUser
		next()
	} catch (e) {
		console.log(e)
		return res.status(403).json('Not authorized')
	}
}

export default authMiddleware
