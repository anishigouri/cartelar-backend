import nodemailer from 'nodemailer';
import configMail from '../config/mail';

interface IMailOptionsInterface {
  from: string;
  to: string;
  subject: string;
  html: string;
}

const transporter = nodemailer.createTransport({
  host: configMail.email.host,
  port: 587,
  auth: {
    user: configMail.email.user,
    pass: configMail.email.pass,
  },
  // tls: { rejectUnauthorized: false },
});

export default function sendEmail(mailOptions: IMailOptionsInterface) {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return false;
    }
    console.log(`Email enviado: ${info.response}`);
    return true;
  });
}
