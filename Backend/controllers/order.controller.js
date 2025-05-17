import Order from "../models/order.model.js";
import { createOrderSchema, updateStatusSchema } from "../schemas/order.schema.js";

// Crear una orden
export const createOrder = async (req, res) => {
  try {
    const parsed = createOrderSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.format() });
    }

    const { products, shippingInformation, totalPrice, paymentMethod, bankProof } = parsed.data;

    if (paymentMethod === "bank" && !bankProof) {
      return res.status(400).json({ message: "Comprobante bancario requerido." });
    }

    const newOrder = new Order({
      products,
      shippingInformation,
      totalPrice,
      paymentMethod,
      bankProof
    });

    await newOrder.save();

    return res.status(201).json({ message: "Orden creada correctamente", order: newOrder });
  } catch (error) {
    console.error("Error al crear la orden:", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
};

// Obtener todas las órdenes
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error al obtener órdenes:", error);
    return res.status(500).json({ message: "Error al obtener órdenes" });
  }
};

// Actualizar el estado de una orden
export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;

  const parsed = updateStatusSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.format() });
  }

  const { status } = parsed.data;

  try {
    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }

    return res.status(200).json({ message: "Estado actualizado", order });
  } catch (error) {
    console.error("Error al actualizar el estado:", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
};
