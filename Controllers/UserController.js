const { User } = require('../models/index')
const bcrypt = require('bcryptjs')

class UserController {
    static async register(req, res) {
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

    static async loginPage(req, res) {
        try {
            res.render(`auth/login.ejs`)
        } catch (error) {
            res.send(error)
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body
            const user = await User.findOne(
                {
                    where: {
                        email: email
                    }
                }
            )

            if (user) {
                // cek password
                const isValidPassword = await bcrypt.compare(password, user.password)
                if (isValidPassword) {
                    //TODO: PASSWORD SALAH
                } else {
                    console.log("gaboleee")
                }
            } else {
                //TODO : email tidak ditemukan
            }
        } catch (error) {

        }
    }
}

module.exports = UserController