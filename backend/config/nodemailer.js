import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
const smtpPort = Number.parseInt(process.env.SMTP_PORT, 10) || 465;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;

if (!smtpUser || !smtpPass) {
  console.error("[Email] Thiếu SMTP_USER hoặc SMTP_PASS trong .env");
}

const transporter = nodemailer.createTransport({
  auth: {
    pass: smtpPass,
    user: smtpUser,
  },
  host: smtpHost,
  port: smtpPort,
  secure: smtpPort === 465,
  tls: {
    rejectUnauthorized: false,
  },
});

transporter.verify(() => {});

export default transporter;
