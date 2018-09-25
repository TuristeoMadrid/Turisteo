require('dotenv').config({path: '.env'});
const nodemailer= require ('nodemailer');


let transporter = nodemailer.createTransport ({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PW
    }
});

const sendMail = (to, subject, html) => {
    return transporter.sendMail ({
        to,
        subject,
        html
    })
    .then(info => console.log(info))
    .catch(error => console.log(error))
};

module.exports = sendMail;