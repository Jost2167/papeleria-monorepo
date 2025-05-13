import 'dotenv/config';
import express from 'express';
import routesProductos from './routes/productos.js';
import cartRoutes from './routes/cartRoutes.js';
import bodyParser from 'body-parser';
import dbClient from './config/dbClient.js';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/productos', routesProductos);
app.use('/api/cart', cartRoutes);

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

