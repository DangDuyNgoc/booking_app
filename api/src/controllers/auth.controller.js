import { AuthService } from "../services/auth.service.js";

const authService = new AuthService();

export async function register(req, res, next) {
  try {
    res.status(201).json({
      message: "User registered successfully. Please verify your email or phone number.",
      data: await authService.register(req.body)
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    res.json(await authService.login(req.body));
  } catch (error) {
    next(error);
  }
}

export async function refresh(req, res, next) {
  try {
    res.json(await authService.refresh(req.body.refreshToken));
  } catch (error) {
    next(error);
  }
}

export async function logout(req, res, next) {
  try {
    res.json(await authService.logout(req.body.refreshToken));
  } catch (error) {
    next(error);
  }
}

export async function forgotPassword(req, res, next) {
  try {
    res.json(await authService.forgotPassword(req.body));
  } catch (error) {
    next(error);
  }
}

export async function resetPassword(req, res, next) {
  try {
    res.status(201).json({
      message: "Password reset successfully."
    });
  } catch (error) {
    next(error);
  }
}

export async function requestOtp(req, res, next) {
  try {
    res.json(await authService.requestOtp(req.body));
  } catch (error) {
    next(error);
  }
}

export async function verifyOtp(req, res, next) {
  try {
    res.json(await authService.verifyOtp(req.body));
  } catch (error) {
    next(error);
  }
}
