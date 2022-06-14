const nodemailer = require('nodemailer');


const SendMail = (reciever , password) =>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'testdeveloper230@gmail.com',
          pass: 'ywmkwldazbwpjesj'
        }
      });
      
      var mailOptions = {
        from: 'testdeveloper230@gmail.com',
        to: reciever,
        subject: 'Login Password',
        text: `Welcome to our website. ${password} is your login password.`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}
module.exports = {SendMail}