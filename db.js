// db.js
import fs from "fs";
import path from "path";

export function connectDB() {
  const dbPath = path.resolve("data");
  if (!fs.existsSync(dbPath)) {
    fs.mkdirSync(dbPath);
    console.log('[DB] Carpeta "data" creada');
  }
  console.log(`[DB] Base de datos conectada en ${dbPath}`);
}
