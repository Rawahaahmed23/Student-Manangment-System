const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});


// transporter.verify((error, success) => {
//   if (error) {
//     console.log("❌ Mailer Error:", error.message);
//   } else {
//     console.log("✅ Mailer Ready");
//   }
// });

module.exports = transporter;