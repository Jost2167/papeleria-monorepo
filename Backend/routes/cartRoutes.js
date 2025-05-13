import express from 'express';
import Cart from '../models/Cart.js';

const router = express.Router();

router.post('/save', async (req, res) => {
  try {
    const cartData = req.body;
    const newCart = new Cart(cartData);
    await newCart.save();
    res.status(201).json({ message: 'Carrito guardado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al guardar el carrito' });
  }
});

// Obtener todos los carritos guardados
router.get("/", async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener los carritos" });
  }
});

export default router;
