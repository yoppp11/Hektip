const express = require('express')
const router = express.Router()

const Controller = require('../controllers/controller')
const UserController = require('../controllers/UserController')
const CourseController = require('../controllers/CourseController')


function redirectIfAuthenticated(req, res, next) {
    if (req.session.user) {
        // Kalau udah login, mental
        return res.redirect('/courses')
    }
    next() // Kalau belum login, lanjut ke handler berikutnya
}

function userOnly(req, res, next) {
    if (req.session.user.role !== "User") {
        let message = "halaman tersebut hanya boleh diakses oleh user"
        return res.redirect(`/?message=${message}`)
    }
    next()
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

router.get('/courses', userOnly, CourseController.index)
router.post('/logout', UserController.logout)
router.get('/join', CourseController.routeJoinClas)

router.get('/courses/:id', CourseController.routeGetCourseId)
router.get('/users/:id/courses', CourseController.findCourseByUserId)

router.post('/courses/:courseId/users/:userId/userCourses', CourseController.enrollCourse)
router.post('/courses/:courseId/users/:userId/comments', CourseController.storeComment)


module.exports = router