require("dotenv").config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
//const from = `Toma <toma.issproject@gmail.com>`;

const authEmailMessages = (email, url) => {
  return {
    confirmEmail: function () {
      return {
        from,
        to: email,
        subject: "Confirm Email",
        html: `Please click this link to confirm your account <a href="${url}">${url}</a>`,
      };
    },
    resetPassword: function () {
      return {
        from,
        to: email,
        subject: "Reset password",
        html: `Please click this link to reset your account <a href="${url}">${url}</a>`,
      };
    },
  };
};

const otpEmailMessages = (email, otp) => {
  return {
    sendOtp: function () {
      return {
        from,
        to: email,
        subject: "Two Factor Authorization Code",
        html: `Code : ${otp}`,
      };
    },
  };
};

const appointmentConfirmation = (user, email, appointment, date, time) => {
  return {
    sendappointmentConfirmation: function () {
      return {
        from,
        to: email,
        subject: "Your appointment",
        html: `<h3><strong>Dear ${user},</strong></h3> The appointment ${appointment} has been scheduled for you on the ${date} at ${start} .
        <br>
        <br>Please make sure to call before two days in case you cancel.
        <br>
        <br>Thank you,
        <br>Toma Team
        <br>
        <br>
        <hr>
    <div style="color:rgb(127, 127, 127);font-size:small;text-align:center"><em>Junior Project, Appointment System Application.</em></div>`,
      };
    },
  };
};
// Get OAuth2 "session" token
const oauth2Client = new OAuth2(
  process.env.G_CLIENT_ID,
  process.env.G_CLIENT_SECRET,
  process.env.G_REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.G_REFRESH_TOKEN,
});

// Refresh token might be broken! We need to fix it
const accessToken = oauth2Client.getAccessToken();
// NodeMailer transporter
const transporter = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE,
  auth: {
    type: process.env.SMTP_TYPE,
    user: process.env.SMTP_USER,
    clientId: process.env.G_CLIENT_ID,
    clientSecret: process.env.G_CLIENT_SECRET,
    refreshToken: process.env.G_REFRESH_TOKEN,
    accessToken: accessToken,
  },
  debug: true,
  logger: true,
});

module.exports = {
  authEmailMessages: authEmailMessages,
  otpEmailMessages: otpEmailMessages,
  transporter: transporter,
  appointmentConfirmation: appointmentConfirmation,
};
