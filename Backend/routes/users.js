import express from 'express';
import { readData, writeData } from '../utils/dbUtils.js';

const router = express.Router();

// Verificar si un correo electrónico o celular existe
router.get('/check-identifier', (req, res) => {
  try {
    const { identifier } = req.query; // Puede ser correo o celular

    if (!identifier) {
      return res.status(400).json({ error: 'El parámetro "identifier" es requerido' });
    }

    const db = readData();

    if (!db || !db.users) {
      return res.status(500).json({ error: 'No se pudieron cargar los usuarios' });
    }

    // Buscar por email o celular
    const user = db.users.find(
      (user) =>
        user.email.toLowerCase() === identifier.toLowerCase() ||
        user.phone?.toString() === identifier.toString()
    );

    if (user) {
      return res.json({ exists: true, message: 'El identificador ya está registrado' });
    }

    res.json({ exists: false, message: 'El identificador no está registrado' });
  } catch (error) {
    console.error('Error al verificar el identificador:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


// Buscar y validar contraseña por correo o celular
router.post('/validate-password', (req, res) => {
  try {
    const { identifier, password } = req.body; // Recibe identificador (correo o celular) y contraseña

    if (!identifier || !password) {
      return res
        .status(400)
        .json({ error: 'Los parámetros "identifier" y "password" son requeridos' });
    }

    const db = readData();

    if (!db || !db.users) {
      return res.status(500).json({ error: 'No se pudieron cargar los usuarios' });
    }

    // Buscar por email o celular
    const user = db.users.find(
      (user) =>
        user.email?.toLowerCase() === identifier.toLowerCase() ||
        user.phone?.toString() === identifier.toString()
    );

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Validar contraseña
    if (user.password === password) {
      return res.json({ valid: true, message: 'Contraseña válida' });
    }

    res.status(401).json({ valid: false, message: 'Contraseña incorrecta' });
  } catch (error) {
    console.error('Error al validar contraseña:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Crear un usuario tipo "natural"
router.post('/create-user', (req, res) => {
  try {
    const { dni, name, email, password, gender, phone, postalCode } = req.body;

    // Validar que los campos obligatorios existan
    if (!dni || !name || !email || !password || !gender || !phone || !postalCode) {
      return res.status(400).json({
        error: 'Todos los campos (dni, name, email, password, gender, phone, postalCode) son obligatorios.',
      });
    }

    const db = readData();

    if (!db || !db.users) {
      return res.status(500).json({ error: 'No se pudieron cargar los usuarios' });
    }

    // Verificar si el usuario ya existe por DNI, correo o celular
    const userExists = db.users.find(
      (user) =>
        user.dni === dni ||
        user.email?.toLowerCase() === email.toLowerCase() ||
        user.phone?.toString() === phone.toString()
    );

    if (userExists) {
      return res.status(400).json({
        error: 'El usuario ya está registrado (DNI, correo o teléfono en uso).',
      });
    }

    // Crear un nuevo usuario
    const newUser = {
      id: db.users.length + 1, // Generar ID automáticamente
      type: 'natural', // Tipo fijo
      dni,
      name,
      email,
      password,
      gender,
      phone,
      postalCode,
    };

    // Agregar el nuevo usuario a la base de datos
    db.users.push(newUser);
    writeData(db);

    res.status(201).json({
      message: 'Usuario creado exitosamente.',
      user: newUser,
    });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


export default router;
