import express from 'express';
import { readData } from '../utils/dbUtils.js';
import jwt from 'jsonwebtoken';

const router = express.Router();
const SECRET_KEY = 'your_secret_key'; // Cambiar por una clave segura

// Ruta de inicio de sesión
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const db = readData();

  if (!db || !db.users) {
    return res.status(500).json({ error: 'Error al cargar los usuarios' });
  }

  const user = db.users.find((user) => user.email === email && user.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Credenciales incorrectas' });
  }

  // Crear token JWT
  const token = jwt.sign({ id: user.id, type: user.type }, SECRET_KEY, { expiresIn: '1h' });

  res.json({ token });
});

export default router;
