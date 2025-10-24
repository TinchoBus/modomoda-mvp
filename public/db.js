const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');
const fs = require('fs');

// 📁 Ruta a la base de datos
const dataDir = path.join(__dirname, 'data');
const DB_PATH = path.join(dataDir, 'modomoda.sqlite');

// 📂 Crear la carpeta "data" si no existe
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log('[DB] Carpeta "data" creada');
}

// 💾 Conexión a la base de datos
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) console.error('[DB] Error al conectar:', err.message);
  else console.log('[DB] Base de datos conectada en', DB_PATH);
});

// 🔧 Inicializar tablas y datos
function init() {
  db.serialize(() => {
    // Tabla de usuarios
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE,
        password TEXT,
        role TEXT DEFAULT 'admin',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabla de productos
    db.run(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT,
        price REAL,
        category TEXT,
        image_url TEXT
      )
    `);

    // Semilla: usuario admin si no existe
    const adminEmail = 'admin@modomoda.com';
    const adminPassword = 'admin123';

    db.get('SELECT * FROM users WHERE email = ?', [adminEmail], (err, row) => {
      if (err) return console.error(err);
      if (!row) {
        bcrypt.hash(adminPassword, 10, (errHash, hash) => {
          if (errHash) return console.error(errHash);
          db.run(
            'INSERT INTO users (name, email, password, role) VALUES (?,?,?,?)',
            ['Admin', adminEmail, hash, 'admin'],
            (err2) => {
              if (err2) console.error(err2);
              else console.log(`[DB] Usuario admin creado -> ${adminEmail} | contraseña: ${adminPassword}`);
            }
          );
        });
      }
    });

    // Semilla: productos si la tabla está vacía
    db.get('SELECT COUNT(*) AS cnt FROM products', (err, row) => {
      if (err) return console.error(err);
      if (row.cnt === 0) {
        const sample = [
          ['Remera Básica Blanca', 'Remera de algodón, corte clásico.', 2500, 'Ropa', 'https://via.placeholder.com/400x400?text=Remera+Blanca'],
          ['Perfume Floral', 'Perfume femenino-unisex, 50ml.', 4200, 'Cosmética', 'https://via.placeholder.com/400x400?text=Perfume'],
          ['Gorro de Lana', 'Gorro tejido, color neutro.', 1800, 'Accesorios', 'https://via.placeholder.com/400x400?text=Gorro']
        ];

        const stmt = db.prepare('INSERT INTO products (name, description, price, category, image_url) VALUES (?,?,?,?,?)');
        sample.forEach(p => stmt.run(p));
        stmt.finalize(() => console.log('[DB] Productos de ejemplo insertados'));
      }
    });
  });
}

module.exports = { db, init };
