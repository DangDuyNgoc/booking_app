import { FareConfigsService } from "../services/fare-configs.service.js";

const fareConfigsService = new FareConfigsService();

export async function listFareConfigs(req, res, next) {
  try {
    res.json({
      message: "Fare configs fetched successfully.",
      data: await fareConfigsService.listFareConfigs(req.query)
    });
  } catch (error) {
    next(error);
  }
}

export async function getFareConfig(req, res, next) {
  try {
    res.json({
      message: "Fare config fetched successfully.",
      data: await fareConfigsService.getFareConfig(req.params.id)
    });
  } catch (error) {
    next(error);
  }
}

export async function createFareConfig(req, res, next) {
  try {
    res.status(201).json({
      message: "Fare config created successfully.",
      data: await fareConfigsService.createFareConfig(req.body)
    });
  } catch (error) {
    next(error);
  }
}

export async function updateFareConfig(req, res, next) {
  try {
    res.json({
      message: "Fare config updated successfully.",
      data: await fareConfigsService.updateFareConfig(req.params.id, req.body)
    });
  } catch (error) {
    next(error);
  }
}

export async function activateFareConfig(req, res, next) {
  try {
    res.json({
      message: "Fare config activated successfully.",
      data: await fareConfigsService.activateFareConfig(req.params.id)
    });
  } catch (error) {
    next(error);
  }
}

export async function deactivateFareConfig(req, res, next) {
  try {
    res.json({
      message: "Fare config deactivated successfully.",
      data: await fareConfigsService.deactivateFareConfig(req.params.id)
    });
  } catch (error) {
    next(error);
  }
}
