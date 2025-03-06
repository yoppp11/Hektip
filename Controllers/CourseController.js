const { Op, where } = require("sequelize");
const { Course, CourseComment, Comment, UserCourse, User } = require("../models/index");
const { route } = require("../routes/web");
const sendMail = require("../helper/sendEmail");

class CourseController {
    static async index(req, res) {
        try {
            const queryParams = req.query.search
            let query = {}

            if (queryParams) {
                query.where = {
                    courseName: {
                        [Op.iLike]: `%${queryParams}%`
                    }
                }
            }

            const user = req.session.user
            let data = await Course.findAll(query)
            res.render(
                'course.ejs',
                {
                    data: data,
                    userData: user
                }

            )
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async routeGetCourseId(req, res) {
        try {
            const user = req.session.user
            let { id } = req.params

            const userCourse = await UserCourse.findOne({
                where: {
                    [Op.and]: [{ UserId: user.id }, { CourseId: id }],
                }
            })

            const query = {
                where: {
                    id: id
                },
                include: {
                    model: Comment,
                    include: {
                        order: [['createdAt', 'asc']],
                        model: User
                    }
                }
            }
            let course = await Course.findOne(query)
            res.render(
                'courseDetail.ejs',
                {
                    courseId: id,
                    course: course,
                    userData: user,
                    comments: course.Comments,
                    userCourse: userCourse
                }
            )
        } catch (error) {
            res.send(error)
        }
    }

    static async routeJoinClas(req, res) {

    }

    static async enrollCourse(req, res) {
        try {
            const now = new Date()
            let {userId, courseId} = req.params
            let dataUser = await User.findByPk(+userId)

            const reqBody = {
                enrolledDate: now,
                UserId: req.params.userId,
                CourseId: req.params.courseId
            }
            await UserCourse.create(
                reqBody
            )
            
            sendMail(dataUser.email)
            res.redirect(`/courses/${req.params.courseId}`)
        } catch (error) {
            res.send(error)
        }
    }

    static async findCourseByUserId(req, res) {
        try {
            const id = req.params.id
            const user = req.session.user

            const query = {
                where: {
                    id: id
                },
                include: {
                    model: Course
                }
            }
            const userCourses = await User.findOne(
                query
            )
            res.render(
                `userCourses.ejs`,
                {
                    courseId: id,
                    userData: user,
                    data: userCourses.Courses
                }
            )
        } catch (error) {
            res.send(error)
        }
    }

    static async storeComment(req, res) {
        try {
            // chaining + req.body
            const comment = await Comment.create(
                req.body
            )
            await CourseComment.create(
                {
                    CommentId: comment.id,
                    CourseId: req.params.courseId
                }
            )
            res.redirect(`/courses/${req.params.courseId}`)
        } catch (error) {
            res.send(error)
        }
    }

    static async editComment(req, res){
        try {
            let { idCourse, idComment } = req.params
            let { user } = req.session
            let comment = await Comment.findByPk(+idComment)
            console.log(comment);

            const userCourse = await UserCourse.findOne({
                where: {
                    [Op.and]: [{ UserId: user.id }, { CourseId: idCourse }],
                }
            })

            const query = {
                where: {
                    id: idCourse
                },
                include: {
                    model: Comment,
                    include: {
                        model: User
                    }
                }
            }
            let course = await Course.findOne(query)
            res.render(
                'edit-comment',
                {
                    comment,
                    courseId: idCourse,
                    course: course,
                    userData: user,
                    comments: course.Comments,
                    userCourse: userCourse
                }
            )


            // res.render('edit-comment', {comment})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async postEditComment(req, res){
        try {
            let {idCourse, idComment} = req.params
            await Comment.update(req.body, {
                where: {
                    id: idComment
                }
            })
            res.redirect(`/courses/${idCourse}`)
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async deleteComment(req, res){
        try {
            console.log(req.params);
            let {idComment, idCourse} = req.params
            await CourseComment.destroy({
                where: {
                    CommentId: idComment
                }
            })
            await Comment.destroy({
                where: {
                    id: idComment
                }
            })
            res.redirect(`/courses/${idCourse}`)
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
}

module.exports = CourseController