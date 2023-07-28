const {Router} = require('express')
const userController = require('../controllers/UserController')
const router = new Router()

router.post('/', userController.createUser)
router.get('/', userController.getUsers)
router.get('/:id', userController.getUser)
router.put('/', userController.updateUser)
router.delete('/:id', userController.deleteUser)

module.exports = router