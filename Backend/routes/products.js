import express from 'express';
import { readData, writeData } from '../utils/dbUtils.js';

const router = express.Router();

// Obtener todos los productos o filtrarlos por categoría o rango de precio
router.get('/', (req, res) => {
  const { categoria, minPrice, maxPrice } = req.query;
  const db = readData();

  if (!db || !db.products) {
    return res.status(500).json({ error: 'No se pudieron cargar los productos' });
  }

  let filteredProducts = db.products;

  if (categoria) {
    filteredProducts = filteredProducts.filter((product) =>
      product.category.toLowerCase().includes(categoria.toLowerCase())
    );
  }
  if (minPrice || maxPrice) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.price >= (minPrice || 0) && product.price <= (maxPrice || Infinity)
    );
  }

  res.json(filteredProducts);
});

// Obtener un producto por ID
router.get('/:id', (req, res) => {
  const db = readData();
  const { id } = req.params;

  if (!db || !db.products) {
    return res.status(500).json({ error: 'No se pudieron cargar los productos' });
  }

  const product = db.products.find((product) => product.id === parseInt(id));
  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  res.json(product);
});

// Crear un nuevo producto
router.post('/', (req, res) => {
  const db = readData();
  if (!db || !db.products) {
    return res.status(500).json({ error: 'No se pudieron cargar los productos' });
  }

  const newProduct = {
    id: db.products.length + 1,
    ...req.body,
  };

  db.products.push(newProduct);
  writeData(db);

  res.status(201).json(newProduct);
});

// Actualizar un producto por ID
router.put('/:id', (req, res) => {
  const db = readData();
  const { id } = req.params;

  if (!db || !db.products) {
    return res.status(500).json({ error: 'No se pudieron cargar los productos' });
  }

  const productIndex = db.products.findIndex((product) => product.id === parseInt(id));
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  db.products[productIndex] = { ...db.products[productIndex], ...req.body };
  writeData(db);

  res.json(db.products[productIndex]);
});

// Eliminar un producto por ID
router.delete('/:id', (req, res) => {
  const db = readData();
  const { id } = req.params;

  if (!db || !db.products) {
    return res.status(500).json({ error: 'No se pudieron cargar los productos' });
  }

  const productIndex = db.products.findIndex((product) => product.id === parseInt(id));
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  const deletedProduct = db.products.splice(productIndex, 1);
  writeData(db);

  res.json(deletedProduct[0]);
});

export default router;
