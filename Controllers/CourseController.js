const { Op } = require("sequelize");
const { Course, CourseComment, Comment, UserCourse, User } = require("../models/index");

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
            let course = await Course.findByPk(+id)
            res.render(
                'courseDetail.ejs',
                {
                    courseId: id,
                    course: course,
                    userData: user
                }
            )
        } catch (error) {
            res.send(error)
        }
    }

    static async routeJoinClas(req, res) {
        console.log(req.session.user);
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
            console.log(userCourses)
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

    static async readComments(req, res) {

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
}

module.exports = CourseController