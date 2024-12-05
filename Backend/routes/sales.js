import express from 'express';
import { readData, writeData } from '../utils/dbUtils.js';

const router = express.Router();

// Obtener todas las ventas o filtrarlas por parámetros
router.get('/', (req, res) => {
  const db = readData();
  const { userId, minTotal, maxTotal, date } = req.query;

  if (!db || !db.sales) {
    return res.status(500).json({ error: 'No se pudieron cargar las ventas' });
  }

  let filteredSales = db.sales;

  if (userId) {
    filteredSales = filteredSales.filter((sale) => sale.userId === parseInt(userId));
  }
  if (minTotal) {
    filteredSales = filteredSales.filter((sale) => sale.total >= parseFloat(minTotal));
  }
  if (maxTotal) {
    filteredSales = filteredSales.filter((sale) => sale.total <= parseFloat(maxTotal));
  }
  if (date) {
    filteredSales = filteredSales.filter((sale) => sale.date === date);
  }

  res.json(filteredSales);
});

// Obtener una venta por ID
router.get('/:id', (req, res) => {
  const db = readData();
  const { id } = req.params;

  if (!db || !db.sales) {
    return res.status(500).json({ error: 'No se pudieron cargar las ventas' });
  }

  const sale = db.sales.find((sale) => sale.id === parseInt(id));
  if (!sale) {
    return res.status(404).json({ error: 'Venta no encontrada' });
  }

  res.json(sale);
});

// Crear una nueva venta
router.post('/', (req, res) => {
  const db = readData();
  if (!db || !db.sales || !db.products || !db.users) {
    return res.status(500).json({ error: 'No se pudieron cargar los datos necesarios' });
  }

  const { userId, products, total, date } = req.body;

  // Verificar si el usuario existe
  const user = db.users.find((user) => user.id === parseInt(userId));
  if (!user) {
    return res.status(400).json({ error: 'Usuario no válido' });
  }

  // Verificar si los productos existen y actualizar stock
  const validProducts = [];
  for (const item of products) {
    const product = db.products.find((p) => p.id === parseInt(item.productId));
    if (!product || product.stock < item.quantity) {
      return res.status(400).json({ error: `Stock insuficiente para el producto ${item.productId}` });
    }
    validProducts.push(product);
  }

  validProducts.forEach((product, index) => {
    product.stock -= products[index].quantity;
  });

  // Crear la venta
  const newSale = {
    id: db.sales.length + 1,
    userId,
    products,
    total,
    date,
  };

  db.sales.push(newSale);
  writeData(db);

  res.status(201).json(newSale);
});

// Actualizar una venta por ID
router.put('/:id', (req, res) => {
  const db = readData();
  const { id } = req.params;

  if (!db || !db.sales) {
    return res.status(500).json({ error: 'No se pudieron cargar las ventas' });
  }

  const saleIndex = db.sales.findIndex((sale) => sale.id === parseInt(id));
  if (saleIndex === -1) {
    return res.status(404).json({ error: 'Venta no encontrada' });
  }

  db.sales[saleIndex] = { ...db.sales[saleIndex], ...req.body };
  writeData(db);

  res.json(db.sales[saleIndex]);
});

// Eliminar una venta por ID
router.delete('/:id', (req, res) => {
  const db = readData();
  const { id } = req.params;

  if (!db || !db.sales) {
    return res.status(500).json({ error: 'No se pudieron cargar las ventas' });
  }

  const saleIndex = db.sales.findIndex((sale) => sale.id === parseInt(id));
  if (saleIndex === -1) {
    return res.status(404).json({ error: 'Venta no encontrada' });
  }

  const deletedSale = db.sales.splice(saleIndex, 1);
  writeData(db);

  res.json(deletedSale[0]);
});

export default router;
