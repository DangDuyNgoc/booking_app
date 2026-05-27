export class SmsService {
  async sendOtp(phone, otp) {
    console.log(`Mock SMS OTP for ${phone}: ${otp}`);
  }
}
