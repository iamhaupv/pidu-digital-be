const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config()
const app = express();
app.use(cors());
app.use(express.json());
app.get('/hello', (req, res) => {
  res.send('Xin chào! Đây là phản hồi dạng text từ server.');
});
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,      
        pass: process.env.APP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Website Contact" <${process.env.EMAIL}>`,
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

    res.status(200).send("Email sent!");
  } catch (error) {
    res.status(500).send("Gửi email thất bại");
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
