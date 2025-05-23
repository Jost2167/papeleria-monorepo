import 'dotenv/config';
import express from 'express';
import routesProductos from './routes/product.routes.js';
import cartRoutes from './routes/cartRoutes.js';
import bodyParser from 'body-parser';
import dbClient from './config/dbClient.js';
import cors from 'cors';
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import paymentSettingsRoutes from "./routes/paymentSettings.js";
import paymentRoutes from "./routes/payment.js";
import orderRoutes from "./routes/order.routes.js";

const app = express();

// Configuración CORS para permitir credenciales (cookies)
app.use(cors({
    origin: 'http://localhost:5173', // Asegúrate de que este es el origen correcto de tu frontend
    credentials: true,  // Esto permite que se incluyan cookies y credenciales en la solicitud
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/productos', routesProductos);
app.use('/api/cart', cartRoutes);
app.use("/api", authRoutes);
app.use("/api/payment", paymentSettingsRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/orders", orderRoutes);

try {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log('Servidor activo en el puerto ' + PORT));
} catch (e) {
    console.log(e);
}

process.on('SIGINT', async () => {
    await dbClient.cerrarBD();
    process.exit(0); 
});
