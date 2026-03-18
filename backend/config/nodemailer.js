import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  auth: {
    pass: process.env.SMTP_PASS,
    user: process.env.SMTP_USER,
  },
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
});

export default transporter;
