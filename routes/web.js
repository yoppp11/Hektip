const express = require('express')
const router = express.Router()

const Controller = require('../Controllers/controller')
const UserController = require('../Controllers/UserController')
const CourseController = require('../Controllers/CourseController')


// TODO : BUAT JADI HELPER
function redirectIfAuthenticated(req, res, next) {
    if (req.session.user) {
        // Kalau udah login, mental ke halaman orders
        return res.redirect('/courses')
    }
    next() // Kalau belum login, lanjut ke handler berikutnya
}

router.get('/', Controller.index)

router.get('/login', redirectIfAuthenticated, UserController.loginPage)
router.post('/login', UserController.login)

router.get('/register', redirectIfAuthenticated, UserController.register)
router.post('/register', UserController.store)

// middleware
router.use(function (req, res, next) {
    if (req.session.user) {
        console.log(req.session);
        next()
    } else {
        // jika belum login, mental
        res.redirect('/login')
    }
})

router.get('/courses', CourseController.routeGetCourses)
router.get('/join', CourseController.routeJoinClas)
router.get('/courses/:id', CourseController.routeGetCourseId)

module.exports = router