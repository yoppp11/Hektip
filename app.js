const express = require('express')
const app = express()
const port = 3000
const webRoutes = require('./routes/web')
const session = require('express-session')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

// menambahkan session
app.use(session({
    secret: 'yofiandnuno',
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: true, // prevent csrf 
        secure: false // di local false di prod true agar session lancar
    }
}))

app.use('/', webRoutes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})