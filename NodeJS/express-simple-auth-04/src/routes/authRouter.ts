import { Router } from 'express'
import { check } from 'express-validator'
import authController from '../controllers/authController'
import roleMiddleware from '../middleware/roleMiddleware'

const authRouter = Router()

authRouter.post(
	'/register',
	[
		check('username', 'Username is required').notEmpty(),
		check('password', 'Password should have at least 4 symbols').isLength({ min: 4 })
	],
	authController.register
)
authRouter.post('/login', authController.login)
authRouter.get('/users', roleMiddleware(['USER']), authController.getUsers)

export default authRouter
