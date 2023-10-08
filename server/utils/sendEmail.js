const nodemailer = require('nodemailer')

const sendEmail = async (options) => {
// console.log("into the sendEmail")
    // const transporter1 = nodemailer.createTransport({
    //     service: "gmail",
    //     auth: {
    //         type: "OAuth2",
    //         user: "shivsawant1958@gmail.com",
    //         clientId: CLIENT_ID,
    //         clientSecret: CLEINT_SECRET,
    //         refreshToken: REFRESH_TOKEN,
    //         accessToken: accessToken,
    //     },
    //     tls: { rejectUnauthorized: false },
    // })

    const transporter = nodemailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        service: process.env.SMPT_SERVICE,
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASS
        }
    })

    // console.log("after the transporter")
    // console.log(options,"optionsoptionsoptions")

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    // console.log("after the mail options")


    await transporter.sendMail(mailOptions)
}

module.exports = sendEmail