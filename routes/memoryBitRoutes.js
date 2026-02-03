const Code = require("../models/Code");

// 🔐 Generar códigos (ADMIN)
router.get("/admin/generate-codes", async (req, res) => {
  try {
    const secret = req.headers["x-admin-secret"];
    if (secret !== process.env.ADMIN_SECRET) {
      return res.status(401).json({ message: "No autorizado" });
    }

    const amount = Number(req.query.amount) || 10;
    const codes = [];

    for (let i = 0; i < amount; i++) {
      const code = Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();

      const newCode = await Code.create({ code });
      codes.push(newCode.code);
    }

    res.json({ codes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const express = require("express");
const router = express.Router();

const {
  createMemoryBit,
  getMemoryBitByPublicId,
  searchMemoryBits
} = require("../controllers/memoryBitController");

// 🔐 Validar código
const codeRecord = await Code.findOne({ code: codeUsed });

if (!codeRecord) {
  return res.status(400).json({ message: "Código inválido" });
}

if (codeRecord.used) {
  return res.status(400).json({ message: "Este código ya fue usado" });
}

// Crear nueva Memory Bit
router.post("/", createMemoryBit);

// 🔒 Marcar código como usado
codeRecord.used = true;
codeRecord.usedAt = new Date();
codeRecord.publicId = publicId;
await codeRecord.save();

// Buscar Memory Bits (⚠️ siempre antes del :publicId)
router.get("/search", searchMemoryBits);

// Obtener Memory Bit por publicId
router.get("/:publicId", getMemoryBitByPublicId);

module.exports = router;