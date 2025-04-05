import * as functions from "firebase-functions";
import * as nodemailer from "nodemailer";

// Create a transporter using Gmail's SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "lookoutlillielene@gmail.com",
    pass: "kymp hpuv skqu ypka",
  },
});

// Cloud function to send an email
exports.sendOTPEmail = functions.https.onRequest((req, res) => {
  const {to, body} = req.body;

  const mailOptions = {
    from: "lookoutlillielene@gmail.com",
    to: to,
    subject: "One Time Passord",
    text: "Welcome to our app!\nYour One Time Password is: "+body +
    "Do not share it with anyone!",
    html: `<p>${body}</p>`,
  };

  transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) {
      console.log("Error:", error);
      return res.status(500).send("Error sending email");
    }
    console.log("Email sent: " + info.response);
    return res.status(200).send("Email sent successfully");
  });
});
