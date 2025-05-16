// routes/payment.js
import express from "express";
import Stripe from "stripe";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // desde dashboard

router.post("/create-payment-intent", async (req, res) => {
    let { amount, currency = "cop" } = req.body;
  
    // Multiplica el monto en pesos por 100 para convertir a centavos
    const amountInCents = amount * 100;
  
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency,
        payment_method_types: ['card'],
      });
  
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
export default router;
