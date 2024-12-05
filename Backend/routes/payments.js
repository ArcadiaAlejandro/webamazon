import express from 'express';
import { readData, writeData } from '../utils/dbUtils.js';

const router = express.Router();

// Obtener todos los métodos de pago o filtrarlos por tipo o usuario
router.get('/', (req, res) => {
  const db = readData();
  const { userId, type } = req.query;

  if (!db || !db.paymentMethods) {
    return res.status(500).json({ error: 'No se pudieron cargar los métodos de pago' });
  }

  let filteredPayments = db.paymentMethods;
  if (userId) {
    filteredPayments = filteredPayments.filter(
      (payment) => payment.userId === parseInt(userId)
    );
  }
  if (type) {
    filteredPayments = filteredPayments.filter(
      (payment) => payment.type.toLowerCase() === type.toLowerCase()
    );
  }

  res.json(filteredPayments);
});

// Obtener un método de pago por ID
router.get('/:id', (req, res) => {
  const db = readData();
  const { id } = req.params;

  if (!db || !db.paymentMethods) {
    return res.status(500).json({ error: 'No se pudieron cargar los métodos de pago' });
  }

  const paymentMethod = db.paymentMethods.find((payment) => payment.id === parseInt(id));
  if (!paymentMethod) {
    return res.status(404).json({ error: 'Método de pago no encontrado' });
  }

  res.json(paymentMethod);
});

// Crear un nuevo método de pago
router.post('/', (req, res) => {
  const db = readData();
  if (!db || !db.paymentMethods) {
    return res.status(500).json({ error: 'No se pudieron cargar los métodos de pago' });
  }

  const newPaymentMethod = {
    id: db.paymentMethods.length + 1,
    ...req.body,
  };

  db.paymentMethods.push(newPaymentMethod);
  writeData(db);

  res.status(201).json(newPaymentMethod);
});

// Actualizar un método de pago por ID
router.put('/:id', (req, res) => {
  const db = readData();
  const { id } = req.params;

  if (!db || !db.paymentMethods) {
    return res.status(500).json({ error: 'No se pudieron cargar los métodos de pago' });
  }

  const paymentIndex = db.paymentMethods.findIndex(
    (payment) => payment.id === parseInt(id)
  );
  if (paymentIndex === -1) {
    return res.status(404).json({ error: 'Método de pago no encontrado' });
  }

  db.paymentMethods[paymentIndex] = { ...db.paymentMethods[paymentIndex], ...req.body };
  writeData(db);

  res.json(db.paymentMethods[paymentIndex]);
});

// Eliminar un método de pago por ID
router.delete('/:id', (req, res) => {
  const db = readData();
  const { id } = req.params;

  if (!db || !db.paymentMethods) {
    return res.status(500).json({ error: 'No se pudieron cargar los métodos de pago' });
  }

  const paymentIndex = db.paymentMethods.findIndex(
    (payment) => payment.id === parseInt(id)
  );
  if (paymentIndex === -1) {
    return res.status(404).json({ error: 'Método de pago no encontrado' });
  }

  const deletedPayment = db.paymentMethods.splice(paymentIndex, 1);
  writeData(db);

  res.json(deletedPayment[0]);
});

export default router;
