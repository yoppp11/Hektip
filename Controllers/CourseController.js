class CourseController {
    static async index(req, res) {
        try {
            const user = req.session.user
            res.render(
                'course.ejs',
                { data: user }
            )
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = CourseController