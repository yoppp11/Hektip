class Controller {
    static async index(req, res) {
        try {
            const query = req.query.message
            const user = req.session.user
            res.render(`index.ejs`,
                {
                    userData: user,
                    message: query
                }
            )
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = Controller