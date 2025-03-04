const express = require('express')
const router = express.Router()

const Controller = require('../controllers/controller')
const UserController = require('../controllers/UserController')
const CourseController = require('../controllers/CourseController')

router.get('/', Controller.index)

router.get('/login', UserController.loginPage)
router.post('/login', UserController.login)

router.get('/register', UserController.register)
router.post('/register', UserController.store)

// middleware
router.use(function (req, res, next) {
    if (req.session.user) {
        next()
    } else {
        // jika belum login, mental
        res.redirect('/login')
    }
})

router.get('/courses', CourseController.index)

module.exports = router