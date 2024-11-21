import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GMAIL_PASS,
  },
});

export async function sendMailConfig(mailaddress, subject, text, html) {
  try {
    const info = await transporter.sendMail({
      from: process.env.GMAIL,
      to: mailaddress,
      subject: subject || "Hello ✔",
      text: text || `active link ${text}`,
      html: html || `<b>Active link ${text}</b>`,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log(error);
  }
}
