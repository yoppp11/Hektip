const { User, UserProfile } = require('../models/index')
const bcrypt = require('bcryptjs')

class UserController {
    static async register(req, res) {
        try {
            let {errors} = req.query
            if (errors) {
                errors = JSON.parse(errors)
            }
            const user = req.session.user
            res.render(
                `auth/register.ejs`,
                { userData: user , errors}
            )
        } catch (error) {
            console.log(error);
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
            if(error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError'){
                error = error.errors.map(el => {
                    return {
                        msg: el.message,
                        path: el.path
                    }
                })

                error = JSON.stringify(error)

                res.redirect(`/register?errors=${error}`)
            } else {

                res.send(error)
            }
        }
    }

    static async profile(req, res){
        try {
            const user = req.session.user
            let data = await UserProfile.findByPk(+user.id)
            res.render('profile', {userData: user, data})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async editProfile(req, res){
        try {
            const user = req.session.user
            console.log(req.body);
            await UserProfile.update(req.body, {
                where: {
                    id: user.id
                }
            })
            res.redirect('/profile')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async loginPage(req, res) {
        try {
            const user = req.session.user
            res.render(
                `auth/login.ejs`,
                { userData: user }
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
                    res.redirect('/')
                } else {
                    // password salah
                    res.redirect('/login')
                }
            } else {
                //email tidak ditemukan
                res.redirect('/login')
            }
        } catch (error) {
            res.send(error)
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