const nodemailer = require("nodemailer");

async function sendMail(email) {
  let transporter = nodemailer.createTransport({
    tls: { rejectUnauthorized: false },
    service: 'gmail',
    auth: {
      user: 'weather.mailer.project@gmail.com',
      pass: 'wmp123456'
    }
  });
 
  var mailOptions = {
    from: ' WeatherApp-NoReply <noreply.weather.mailer.project@gmail.com>',
    to: email,
    subject: 'Welcom to the weather App',
    text: 'have a good day!:)'
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(`error ${error}`);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
module.exports = { sendMail }