const express = require("express");
const router = express.Router();

const {
  createMemoryBit,
  getMemoryBitByPublicId,
  searchMemoryBits,
  generateCodes
} = require("../controllers/memoryBitController");

// 🔐 ADMIN — generar códigos
router.get("/admin/generate-codes", generateCodes);

// ➕ Crear nueva Memory Bit
router.post("/", createMemoryBit);

// 🔍 Buscar Memory Bits
router.get("/search", searchMemoryBits);

// 📄 Obtener Memory Bit por publicId
router.get("/:publicId", getMemoryBitByPublicId);

module.exports = router;