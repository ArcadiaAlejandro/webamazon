import fs from 'fs';

const DB_PATH = './db.json';

// Leer datos del archivo JSON
export const readData = () => {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Error al leer db.json:", error.message);
    return null;
  }
};

// Escribir datos en el archivo JSON
export const writeData = (data) => {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error al escribir en db.json:", error.message);
  }
};
