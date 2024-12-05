import express from 'express';
import { readData, writeData } from '../utils/dbUtils.js';

const router = express.Router();

// Obtener todas las facturas o filtrarlas por parámetros
router.get('/', (req, res) => {
  const db = readData();
  const { userId, minTotal, maxTotal, date } = req.query;

  if (!db || !db.invoices) {
    return res.status(500).json({ error: 'No se pudieron cargar las facturas' });
  }

  // Filtrar facturas si se proporcionan parámetros
  let filteredInvoices = db.invoices;
  if (userId) {
    filteredInvoices = filteredInvoices.filter((invoice) => invoice.userId === parseInt(userId));
  }
  if (minTotal) {
    filteredInvoices = filteredInvoices.filter((invoice) => invoice.total >= parseFloat(minTotal));
  }
  if (maxTotal) {
    filteredInvoices = filteredInvoices.filter((invoice) => invoice.total <= parseFloat(maxTotal));
  }
  if (date) {
    filteredInvoices = filteredInvoices.filter((invoice) => invoice.date === date);
  }

  res.json(filteredInvoices);
});

// Obtener una factura por ID
router.get('/:id', (req, res) => {
  const db = readData();
  const { id } = req.params;

  if (!db || !db.invoices) {
    return res.status(500).json({ error: 'No se pudieron cargar las facturas' });
  }

  const invoice = db.invoices.find((invoice) => invoice.id === parseInt(id));
  if (!invoice) {
    return res.status(404).json({ error: 'Factura no encontrada' });
  }

  res.json(invoice);
});

// Crear una nueva factura
router.post('/', (req, res) => {
  const db = readData();
  if (!db || !db.invoices) {
    return res.status(500).json({ error: 'No se pudieron cargar las facturas' });
  }

  const newInvoice = {
    id: db.invoices.length + 1,
    ...req.body,
  };

  db.invoices.push(newInvoice);
  writeData(db);

  res.status(201).json(newInvoice);
});

// Actualizar una factura por ID
router.put('/:id', (req, res) => {
  const db = readData();
  const { id } = req.params;

  if (!db || !db.invoices) {
    return res.status(500).json({ error: 'No se pudieron cargar las facturas' });
  }

  const invoiceIndex = db.invoices.findIndex((invoice) => invoice.id === parseInt(id));
  if (invoiceIndex === -1) {
    return res.status(404).json({ error: 'Factura no encontrada' });
  }

  // Actualizar la factura
  db.invoices[invoiceIndex] = { ...db.invoices[invoiceIndex], ...req.body };
  writeData(db);

  res.json(db.invoices[invoiceIndex]);
});

// Eliminar una factura por ID
router.delete('/:id', (req, res) => {
  const db = readData();
  const { id } = req.params;

  if (!db || !db.invoices) {
    return res.status(500).json({ error: 'No se pudieron cargar las facturas' });
  }

  const invoiceIndex = db.invoices.findIndex((invoice) => invoice.id === parseInt(id));
  if (invoiceIndex === -1) {
    return res.status(404).json({ error: 'Factura no encontrada' });
  }

  // Eliminar la factura
  const deletedInvoice = db.invoices.splice(invoiceIndex, 1);
  writeData(db);

  res.json(deletedInvoice[0]);
});

export default router;
