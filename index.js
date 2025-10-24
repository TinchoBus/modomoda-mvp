import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// 🔹 Conectar base de datos
connectDB();

// 🔹 Middlewares
app.use(express.json()); // para recibir JSON en POST
app.use(express.static(path.join(__dirname, "public"))); // carpeta pública

// 🔹 Rutas simples
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 🔹 Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en: http://localhost:${PORT}`);
});
