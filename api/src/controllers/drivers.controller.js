import { DriversService } from "../services/drivers.service.js";

const driversService = new DriversService();

export async function submitMyVerification(req, res, next) {
  try {
    res.json(await driversService.submitMyVerification(req.auth.userId, req.body, req.files));
  } catch (error) {
    next(error);
  }
}

export async function getMyVerification(req, res, next) {
  try {
    res.json(await driversService.getMyVerification(req.auth.userId));
  } catch (error) {
    next(error);
  }
}

export async function listVerifications(req, res, next) {
  try {
    res.json(await driversService.listVerifications(req.query));
  } catch (error) {
    next(error);
  }
}

export async function getVerificationById(req, res, next) {
  try {
    res.json(await driversService.getVerificationById(req.params.id));
  } catch (error) {
    next(error);
  }
}

export async function approveVerification(req, res, next) {
  try {
    res.json(await driversService.approveVerification(req.params.id));
  } catch (error) {
    next(error);
  }
}

export async function rejectVerification(req, res, next) {
  try {
    res.json(await driversService.rejectVerification(req.params.id, req.body));
  } catch (error) {
    next(error);
  }
}

export async function updateMyAvailability(req, res, next) {
  try {
    res.json(await driversService.updateMyAvailability(req.auth.userId, req.body));
  } catch (error) {
    next(error);
  }
}
