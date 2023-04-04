
/*
    Author: Manasvi(mn838732@dal.ca)
*/

const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "Gmail",
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: 'tutorlycontact@gmail.com',
    pass: 'xhxjylgkvlpkdfqm',
  },
});

module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
    transport.sendMail({
      from: "TUTORLY",
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>Thank you for registration. Below is your confirmation code.</p>
          <p> ${confirmationCode}</p>
          </div>`,
    }).catch(err => console.log(err));
  };

  module.exports.sendResetEmail = (name, email, confirmationCode) => {
    transport.sendMail({
      from: "TUTORLY",
      to: email,
      subject: "Please check the OTP",
      html: `<h1>Reset Password</h1>
          <h2>Hello ${name}</h2>
          <p>Below is your OTP code to reset password:</p>
          <p> ${confirmationCode}</p>
          </div>`,
    }).catch(err => console.log(err));
  };