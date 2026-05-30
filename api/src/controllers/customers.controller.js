import { CustomersService } from "../services/customers.service.js";

const customersService = new CustomersService();

export async function quoteOrder(req, res, next) {
  try {
    res.json({
      message: "Order quote calculated successfully.",
      data: await customersService.quoteOrder(req.body)
    });
  } catch (error) {
    next(error);
  }
}

export async function createOrder(req, res, next) {
  try {
    res.status(201).json({
      message: "Customer order created successfully.",
      data: await customersService.createOrder(req.auth.userId, req.body)
    });
  } catch (error) {
    next(error);
  }
}

export async function listMyOrders(req, res, next) {
  try {
    res.json({
      message: "Customer orders fetched successfully.",
      data: await customersService.listMyOrders(req.auth.userId, req.query)
    });
  } catch (error) {
    next(error);
  }
}

export async function getMyOrder(req, res, next) {
  try {
    res.json({
      message: "Customer order fetched successfully.",
      data: await customersService.getMyOrder(req.auth.userId, req.params.id)
    });
  } catch (error) {
    next(error);
  }
}

export async function cancelMyOrder(req, res, next) {
  try {
    res.json({
      message: "Customer order cancelled successfully.",
      data: await customersService.cancelMyOrder(req.auth.userId, req.params.id, req.body)
    });
  } catch (error) {
    next(error);
  }
}

export function listPaymentMethods(_req, res) {
  res.json({
    message: "Payment methods fetched successfully.",
    data: customersService.listPaymentMethods()
  });
}
