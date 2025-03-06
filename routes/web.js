const express = require('express')
const router = express.Router()

const Controller = require('../Controllers/controller')
const UserController = require('../Controllers/UserController')
const CourseController = require('../Controllers/CourseController')


function redirectIfAuthenticated(req, res, next) {
    if (req.session.user) {
        // Kalau udah login, mental
        return res.redirect('/courses')
    }
    next() // Kalau belum login, lanjut ke handler berikutnya
}

function userOnly(req, res, next) {
    if (req.session.user.role !== "user") {
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
router.get('/profile', UserController.profile)
router.post('/logout', UserController.logout)
router.get('/join', CourseController.routeJoinClas)

router.post('/profile/edit', UserController.editProfile)
router.get('/courses/:id', CourseController.routeGetCourseId)
router.get('/courses/:idCourse/edit/:idComment', CourseController.editComment)
router.post('/courses/:idCourse/edit/:idComment', CourseController.postEditComment)
router.get('/courses/:idCourse/delete/:idComment', CourseController.deleteComment)
router.get('/users/:id/courses', CourseController.findCourseByUserId)

router.post('/courses/:courseId/users/:userId/userCourses', CourseController.enrollCourse)
router.post('/courses/:courseId/users/:userId/comments', CourseController.storeComment)


module.exports = router