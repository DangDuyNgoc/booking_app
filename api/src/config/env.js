export const config = {
  apiPort: Number(process.env.API_PORT ?? 8080),
  databaseUrl: required("DATABASE_URL"),
  jwt: {
    accessTokenSecret: secret("ACCESS_TOKEN_SECRET", "local-dev-access-secret"),
    refreshTokenSecret: secret("REFRESH_TOKEN_SECRET", "local-dev-refresh-secret"),
    accessTokenTtl: process.env.ACCESS_TOKEN_TTL ?? "15m",
    refreshTokenTtl: process.env.REFRESH_TOKEN_TTL ?? "7d",
    refreshTokenDays: Number(process.env.REFRESH_TOKEN_DAYS ?? 7)
  },
  smtp: {
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT ?? 587),
    service: process.env.SMTP_SERVICE ?? "gmail",
    mail: process.env.SMTP_MAIL,
    password: process.env.SMTP_PASSWORD
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? process.env.CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY ?? process.env.CLOUD_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET ?? process.env.CLOUD_SECRET_KEY
  },
  otp: {
    ttlMinutes: Number(process.env.OTP_TTL_MINUTES ?? 5),
    secret: process.env.OTP_SECRET ?? "local-dev-otp-secret",
    exposeDevOtp: process.env.NODE_ENV !== "production"
  }
};

function required(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is required`);
  }

  return value;
}

function secret(name, fallback) {
  const value = process.env[name];

  if (value) {
    return value;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error(`${name} is required`);
  }

  return fallback;
}
