import express from "express";
import {
  getPaymentSettings,
  updatePaymentSettings,
} from "../controllers/paymentSettingsController.js";

const router = express.Router();

router.get("/", getPaymentSettings);
router.put("/", updatePaymentSettings);

export default router;
