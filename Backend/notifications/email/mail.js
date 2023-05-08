const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "iamasum369@outlook.com",
      pass: "Visionman@369",
    },
  });

  const SENDMAIL = async (mailDetails, callback) => {
    try {
      const info = await transporter.sendMail(mailDetails)
      callback(info);
    } catch (error) {
      console.log(error);
    } 
  };

  module.exports = SENDMAIL;
