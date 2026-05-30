import { Router } from "express";
import {
  cancelMyOrder,
  createOrder,
  getMyOrder,
  listMyOrders,
  listPaymentMethods,
  quoteOrder
} from "../controllers/customers.controller.js";
import { requireAuth, requireRole } from "../middleware/auth.middleware.js";

export function createCustomersRoutes() {
  const router = Router();

  router.use(requireAuth, requireRole("CUSTOMER"));

  router.post("/orders/quote", quoteOrder);
  router.post("/orders", createOrder);
  router.get("/orders", listMyOrders);
  router.get("/orders/:id", getMyOrder);
  router.patch("/orders/:id/cancel", cancelMyOrder);
  router.get("/payment-methods", listPaymentMethods);

  return router;
}