const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Function to send email
const sendEmail = async (to, subject, message) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      text: message,
    });

    console.log(`Email sent: ${info.response}`);
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error("Error sending email");
  }
};

module.exports = sendEmail;
