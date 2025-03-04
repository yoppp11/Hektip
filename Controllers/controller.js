class Controller {
    static async index(req, res) {
        try {
            res.render(`index.ejs`)
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = Controller