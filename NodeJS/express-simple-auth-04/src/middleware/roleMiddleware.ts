import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const roleMiddleware = (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
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
		//@ts-ignore
		const { roles: userRoles }: { roles: string[] } = jwt.verify(token, secretKey)
		let hasRole = false
		userRoles.forEach((role) => {
			if (roles.includes(role)) {
				hasRole = true
			}
		})

		if (!hasRole) {
			return res.status(403).json('Not authorized')
		}

		next()
	} catch (e) {
		console.log(e)
		return res.status(403).json('Not authorized')
	}
}

export default roleMiddleware
