import express from 'express';
import Cart from '../models/Cart.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Crear carrito nuevo
router.post('/save', async (req, res) => {
  try {
    const cartId = uuidv4();
    const cartData = { ...req.body, cartId };
    const newCart = new Cart(cartData);
    await newCart.save();
    res.status(201).json({ message: 'Carrito guardado correctamente', cartId });
  } catch (err) {
    res.status(500).json({ error: 'Error al guardar el carrito' });
  }
});

// Actualizar carrito existente
router.put('/save/:cartId', async (req, res) => {
  try {
    const { cartId } = req.params;
    const updatedCart = await Cart.findOneAndUpdate(
      { cartId },
      req.body,
      { new: true }
    );
    if (!updatedCart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }
    res.status(200).json({ message: 'Carrito actualizado', cartId });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el carrito' });
  }
});

// Obtener todos los carritos (opcional para debug)
router.get("/", async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener los carritos" });
  }
});

export default router;
