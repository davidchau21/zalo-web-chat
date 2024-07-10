const nodemailer = require("nodemailer");

// Khởi tạo transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "davidduongxu1@gmail.com", // Thay bằng email của bạn
    pass: "hcha ozkh czvc uecc", // Thay bằng mật khẩu của bạn
  },
});

// Hàm gửi email
const sendSEmail = async ({ to, subject, html, attachments }) => {
  try {
    // Cấu hình email
    const mailOptions = {
      from: "davidduongxu1@gmail.com", // Thay bằng email của bạn
      to: to,
      subject: subject,
      html: html,
      attachments: attachments,
    };

    // Gửi email
    return transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
  }
};

exports.sendEmail = async (agrs) => {
  if (!process.env.NODE_ENV === "development") {
    return Promise.resolve();
  } else {
    return sendSEmail(agrs);
  }
};
