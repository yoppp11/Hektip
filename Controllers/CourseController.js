const { Op, where } = require("sequelize");
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

            const query = {
                where: {
                    id: id
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
                'courseDetail.ejs',
                {
                    courseId: id,
                    course: course,
                    userData: user,
                    comments: course.Comments
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