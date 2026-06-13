import dotenv from "dotenv"
import nodemailer from "nodemailer"

dotenv.config()

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.GOOGLE_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
})

transporter.verify((error, success) => {
  if (error) {
    console.error("Error connect to email", error)
  } else {
    console.log("Email Service is ready to send messages")
  }
})

export async function sendEmail({ to, subject, html, text }) {
  const mailOptions = {
    from: process.env.GOOGLE_USER,
    to,
    subject,
    html,
    text,
  }
  const details = await transporter.sendMail(mailOptions)
  console.log("Email sent:", details)
  return details
}
