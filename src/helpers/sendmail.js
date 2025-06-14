require("dotenv").config()
const nodemailer = require("nodemailer")

const sendMail = async({email, suject, html}) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        service: "gmail",
        auth: {
          user: process.env.EMAIL,      
          pass: process.env.APP_PASS,
        },
      });
    const message = await transporter.sendMail({
        from: `"Website Contact" <your_gmail@gmail.com>`,
        to: "iamhaupv@gmail.com",
        subject: "Yêu cầu tư vấn mới từ website",
        html: `
          <h3>Thông tin liên hệ</h3>
          <p><strong>Họ và tên:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>SĐT:</strong> ${phone}</p>
          <p><strong>Nội dung:</strong> ${message}</p>
        `,
      });
  
      const result = await transporter.sendMail(message)
      return result
} 
module.exports = sendMail