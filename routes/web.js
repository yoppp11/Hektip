const express = require('express')
const router = express.Router()

const Controller = require('../controllers/controller')
const UserController = require('../controllers/UserController')
const CourseController = require('../controllers/CourseController')


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

router.get('/courses', CourseController.index)
router.post('/logout', UserController.logout)
router.get('/join', CourseController.routeJoinClas)



router.get('/courses/:id', CourseController.routeGetCourseId)
router.get('/users/:id/courses', CourseController.findCourseByUserId)


module.exports = router