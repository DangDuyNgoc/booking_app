import { DriversService } from "../services/drivers.service.js";

const driversService = new DriversService();

export async function submitMyVerification(req, res, next) {
  try {
    res.json(await driversService.submitMyVerification(req.auth.userId, req.body, req.files));
  } catch (error) {
    next(error);
  }
}
