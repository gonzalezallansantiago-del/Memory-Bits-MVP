const express = require("express");
const router = express.Router();

const {
  createMemoryBit,
  getMemoryBitByPublicId,
  searchMemoryBits,
  generateCodes,
  validateCode
} = require("../controllers/memoryBitController");

/* ===============================
   🔐 ADMIN — generar códigos
   =============================== */
router.get("/admin/generate-codes", generateCodes);

/* ===============================
   🔎 Validar código (PÚBLICO)
   ⚠️ Debe ir ANTES de /:publicId
   =============================== */
router.get("/validate-code/:code", validateCode);

/* ===============================
   ➕ Crear nueva Memory Bit
   =============================== */
router.post("/", createMemoryBit);

/* ===============================
   🔍 Buscar Memory Bits
   (⚠️ SIEMPRE antes del :publicId)
   =============================== */
router.get("/search", searchMemoryBits);

/* ===============================
   📄 Obtener Memory Bit pública
   =============================== */
router.get("/:publicId", getMemoryBitByPublicId);

module.exports = router;