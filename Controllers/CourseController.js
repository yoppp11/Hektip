const { EagerLoadingError } = require("sequelize");
const { Course, CourseComment, Comment, UserCourse, User } = require("../models/index");
const { Query } = require("pg");

class CourseController {
    static async index(req, res) {
        try {

            const user = req.session.user
            let data = await Course.findAll()
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
            let { id } = req.params
            let course = await Course.findByPk(+id, {
                include: {
                    model: CourseComment,
                    where: {
                        CourseId: +id
                    }
                }
            })
            let courseComment = await Promise.all(

                course.dataValues.CourseComments.map(async (el) => {
                    try {
                        return await Comment.findOne({
                            where: {
                                id: el.CommentId
                            }
                        })

                    } catch (error) {
                        throw error
                    }
                })
            )
            // courseComment = courseComment[0]
            // console.log(course.dataValues.CourseComments);
            console.log(courseComment);
            res.render('detail-course', { course, courseComment })
        } catch (error) {
            console.log(error);
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
                    userData: user,
                    data: userCourses.Courses
                }
            )
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = CourseController