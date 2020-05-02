const utils = require("../db/utils");
const nodemailer = require('nodemailer');
module.exports = {
   sendEmail
};

async function sendEmail(mail,hash, callback) {

    let transporter = nodemailer.createTransport({
        service : "Gmail",
        auth: {
            user: "projweb2020@gmail.com", 
            pass: "javascript" 
        }
    });
    let info = await transporter.sendMail({
        from: "projweb2020@gmail.com",
        to: `${mail}`,
        subject: "Projet Web Année spéciale", 
        text: "check this", 
        html: `<h1>Hello Friend Please Click on this link<h1><br><hr><p>HELLO I AM 
        Roberto Collantes I made this app for my web project, luv.</p>
        <br><a href="http://localhost:5000/verification/?verify=${hash}">CLICK ME TO ACTIVATE YOUR ACCOUNT</a>`
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    callback(false, info);

}