const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");

dotenv.config();

const app = express();

// 🔗 Conectar a MongoDB
connectDB();

// 📦 Middleware
app.use(express.json());

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