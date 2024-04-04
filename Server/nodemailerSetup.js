const nodemailer = require('nodemailer');
const dotenv=require('dotenv');
dotenv.config();


const sendMail = async (defaultMailOptions) =>{
  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: "smtp.forwardemail.net",
    secure: false,
    auth: {
      user: process.env.EMAIL_CREDS,
      pass: process.env.PASSWORD_CREDS,
    },
  });

  const info = await transporter.sendMail({defaultMailOptions});

  console.log("Message sent: %s", info.messageId);
}


const defaultMailOptions = {
  from: process.env.EMAIL_CREDS,
  to: '',
  subject: 'You have been Evaluated!',
  text: 'Your Mentor has assigned you the scores in all domain. Visit the website to have a look.',
};

module.exports = {
  sendMail,
  defaultMailOptions,
};
