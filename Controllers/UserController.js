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
            let user
            if (req.session.user) {
                user = req.session.user
            }
            res.render(
                `auth/login.ejs`,
                { data: user }
            )
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
                    req.session.user = {
                        id: user.id,
                        role: user.role,
                        email: user.email
                    }
                    res.redirect('/courses')
                } else {
                    // password salah
                    res.redirect('/login')
                }
            } else {
                //email tidak ditemukan
                res.redirect('/login')
            }
        } catch (error) {

        }
    }

    static async logout(req, res) {
        try {
            req.session.destroy(() => {
                res.redirect('/login')
            })
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = UserController