const rateLimit = require("express-rate-limit");
const crypto = require("crypto");
const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");

dotenv.config();

const app = express();

// ✅ HABILITAR CORS (CLAVE PARA POST EN PRODUCCIÓN)
app.use(cors());

// 🔗 Conectar a MongoDB
connectDB();

// 📦 Middleware
app.use(express.json());

/* 🔒 NUEVO — Rate Limit para proteger la API */
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 30, // máximo 30 requests por IP
  message: { message: "Demasiadas solicitudes. Intenta nuevamente en un minuto." }
});

/* 🔒 NUEVO — aplicar limitador a la API */
app.use("/api/", apiLimiter);

// 📂 Servir archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// 🔌 Rutas API
const memoryBitRoutes = require("./routes/memoryBitRoutes");
app.use("/api/memory-bits", memoryBitRoutes);

// 🏠 HOME
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 🧾 TARJETA PÚBLICA (por publicId)
app.get("/:publicId", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "bit.html"));
});

// 🚀 Puerto (Render usa PORT dinámico)
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});