const express = require('express')
const userController = require('../controllers/userController')
const { body } = require('express-validator')
const authMiddleware = require('../middlewares/authMiddleware')

const router = new express.Router()

router.post(
	'/register',
	body('email').isEmail(),
	body('password').isLength({ min: 5, max: 32 }),
	userController.register
)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)

/**
 * Test function - only authorized users can reach to this endpoint
 */
router.get('/users', authMiddleware, userController.getUsers)

module.exports = router
