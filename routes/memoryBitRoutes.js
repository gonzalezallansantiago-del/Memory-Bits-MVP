const express = require("express");
const router = express.Router();

const {
  createMemoryBit,
  getMemoryBitByPublicId,
  searchMemoryBits
} = require("../controllers/memoryBitController");

// Crear nueva Memory Bit
router.post("/", createMemoryBit);

// Buscar Memory Bits (⚠️ siempre antes del :publicId)
router.get("/search", searchMemoryBits);

// Obtener Memory Bit por publicId
router.get("/:publicId", getMemoryBitByPublicId);

module.exports = router;