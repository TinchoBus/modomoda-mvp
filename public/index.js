const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { db, init } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// 🧩 Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // para servir imágenes o archivos estáticos

// 🗄️ Inicializar base de datos
init();

// 🧠 Rutas básicas
app.get('/', (req, res) => {
  res.send('🚀 Servidor ModoModa activo y base de datos conectada.');
});

// 📦 Obtener todos los productos
app.get('/api/products', (req, res) => {
  db.all('SELECT * FROM products', (err, rows) => {
    if (err) {
      console.error('[DB] Error:', err);
      res.status(500).json({ error: 'Error al obtener productos' });
    } else {
      res.json(rows);
    }
  });
});

// 👤 Login simple (email + password)
const bcrypt = require('bcrypt');

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err) return res.status(500).json({ error: 'Error en el servidor' });
    if (!user) return res.status(401).json({ error: 'Usuario no encontrado' });

    bcrypt.compare(password, user.password, (err2, result) => {
      if (result) {
        res.json({ message: 'Login exitoso', user: { id: user.id, name: user.name, role: user.role } });
      } else {
        res.status(401).json({ error: 'Contraseña incorrecta' });
      }
    });
  });
});

// 🛍️ Crear nuevo producto (ejemplo para panel admin)
app.post('/api/products', (req, res) => {
  const { name, description, price, category, image_url } = req.body;
  const stmt = db.prepare('INSERT INTO products (name, description, price, category, image_url) VALUES (?,?,?,?,?)');
  stmt.run([name, description, price, category, image_url], function (err) {
    if (err) {
      console.error('[DB] Error:', err);
      res.status(500).json({ error: 'Error al crear producto' });
    } else {
      res.json({ message: 'Producto creado', id: this.lastID });
    }
  });
  stmt.finalize();
});

// 🚀 Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en: http://localhost:${PORT}`);
});

