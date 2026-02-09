const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host:'smtp-relay.brevo.com',
  port:587,
  auth:{
    user:process.env.SMTP_User,
    pass:process.env.SMTP_PASS
  }
});


module.exports = transporter