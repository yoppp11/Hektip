class Controller {
    static async index(req, res) {
        try {
            const user = req.session.user
            res.render(`index.ejs`,
                { userData: user }
            )
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = Controller