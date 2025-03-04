const express = require('express')
const router = express.Router()

const Controller = require('../controllers/controller')
const UserController = require('../controllers/UserController')

router.get('/', Controller.index)

router.get('/register', UserController.create)
router.post('/register', UserController.store)

module.exports = router