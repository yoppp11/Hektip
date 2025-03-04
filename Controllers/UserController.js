const { User } = require('../models/index')

class UserController {
    static async create(req, res) {
        try {
            res.render(
                `auth/register.ejs`
            )
        } catch (error) {
            res.send(error)
        }
    }

    static async store(req, res) {
        try {
            await User.create(
                req.body
            )
            res.redirect('/login')
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = UserController