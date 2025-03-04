class CourseController {
    static async index(req, res) {
        try {
            res.render(
                'course.ejs'
            )
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = CourseController