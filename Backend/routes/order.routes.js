import express from "express";
import {
  createOrder,
  getAllOrders,
  updateOrderStatus
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", createOrder); // Crear orden
router.get("/", getAllOrders); // Obtener todas las órdenes
router.put("/:id/status", updateOrderStatus); // Cambiar estado

export default router;
