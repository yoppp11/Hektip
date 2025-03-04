const express = require('express')
const router = express.Router()

const Controller = require('../controllers/controller')
const UserController = require('../controllers/UserController')

router.get('/', Controller.index)

router.get('/login', UserController.loginPage)
router.post('/login')

router.get('/register', UserController.register)
router.post('/register', UserController.store)

module.exports = router