import express from 'express';
import productsRoutes from './routes/products.js';
import usersRoutes from './routes/users.js';
import salesRoutes from './routes/sales.js';
import invoicesRoutes from './routes/invoices.js';
import paymentsRoutes from './routes/payments.js';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());

// Middleware
app.use(express.json());

// Rutas
app.use('/productos', productsRoutes);
app.use('/usuarios', usersRoutes);
app.use('/ventas', salesRoutes);
app.use('/facturas', invoicesRoutes);
app.use('/metodos-pago', paymentsRoutes);

// Servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
