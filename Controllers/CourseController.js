const { EagerLoadingError } = require("sequelize");
const {Course, CourseComment, Comment} = require("../models/index")

class CourseController {
    static async routeGetCourses(req, res) {
        try {
            console.log(req.query);
            let {search, filter} = req.query
            let data = await Course.getData(search, filter)
            if(filter){

                let filt = await Course.findAll({
                    where: {
                        level: filter
                    }
                })
                console.log(filt);
            }
            res.render(
                'course.ejs',
                {data}
            )
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async routeGetCourseId(req, res){
        try {
            let {id} = req.params
            let course = await Course.findByPk(+id, {
                include: {
                    model: CourseComment,
                    where: {
                      CourseId: +id
                    }
                }
            })
            let courseComment = await Promise.all(

                course.dataValues.CourseComments.map( async (el) => {
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
            res.render('detail-course', {course, courseComment})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async routeJoinClas(req, res){
        console.log(req.session.user);
    }
}

module.exports = CourseController