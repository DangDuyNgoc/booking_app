import nodemailer from "nodemailer";
import { HttpError } from "../common/http-error.js";
import { config } from "../config/env.js";

export class EmailService {
  constructor() {
    this.transporter = null;
  }

  sendOtp(email, otp) {
    return this.sendMail({
      to: email,
      subject: "Your verification code",
      text: `Your verification code is ${otp}. It expires in ${config.otp.ttlMinutes} minutes.`
    });
  }

  async sendMail({ to, subject, text }) {
    if (!config.smtp.mail || !config.smtp.password) {
      if (process.env.NODE_ENV !== "production") {
        console.log(`Mock email to ${to}: ${text}`);
        return;
      }

      throw new HttpError(500, "SMTP credentials are not configured");
    }

    await this.getTransporter().sendMail({
      from: config.smtp.mail,
      to,
      subject,
      text
    });
  }

  getTransporter() {
    if (!this.transporter) {
      this.transporter = nodemailer.createTransport({
        host: config.smtp.host,
        port: config.smtp.port,
        service: config.smtp.service,
        secure: config.smtp.port === 465,
        auth: {
          user: config.smtp.mail,
          pass: config.smtp.password
        }
      });
    }

    return this.transporter;
  }
}
