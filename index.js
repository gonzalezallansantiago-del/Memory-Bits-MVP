const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db.js");

dotenv.config();

const app = express();

// 🔒 Seguridad pasiva
app.disable("x-powered-by");

// 🛡️ Rate limit (anti-spam)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // 100 requests por IP
});

app.use(limiter);

// 🔌 Conectar a MongoDB
connectDB();

// 📦 Middleware
app.use(express.json());

// 🌐 Servir frontend
app.use(express.static(path.join(__dirname, "public")));

// 🔗 Rutas API
const memoryBitRoutes = require("./routes/memoryBitRoutes");
app.use("/api/memory-bits", memoryBitRoutes);

// 🧪 Ruta de prueba
app.get("/", (req, res) => {
  res.send("Memory Bits API funcionando");
});

// 🧭 URL bonita: /PUBLIC_ID
app.get("/:publicId", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 🚀 Arrancar servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});