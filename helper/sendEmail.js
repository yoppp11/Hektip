const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    secure: true,
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: 'jtt1234511@gmail.com',
        pass: 'ddlnjytugtogfhlr'
    }
})

function sendMail(tujuan){
    transporter.sendMail({
        from: 'noreply@gmail.com',
        to: tujuan,
        subject: 'Selamatt!',
        html: `<h1>Selamat Anda Berhasil Untuk Bergabung Di Kelas</h1>`
    })

}

sendMail('takgae01@gmail.com')