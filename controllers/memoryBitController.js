const MemoryBit = require("../models/MemoryBit");
const Code = require("../models/Code");

/**
 * Crear Memory Bit (SEGURA, basada SOLO en código)
 */
exports.createMemoryBit = async (req, res) => {
  try {
    const {
      title,
      content,
      textColor,
      codeUsed,
      publicId
    } = req.body;

    if (!title || !content || !codeUsed || !publicId) {
      return res.status(400).json({
        message: "Faltan campos obligatorios"
      });
    }

    const codeRecord = await Code.findOne({ code: codeUsed });

    if (!codeRecord) {
      return res.status(400).json({ message: "Código inválido" });
    }

    if (codeRecord.used) {
      return res.status(400).json({ message: "Este código ya fue utilizado" });
    }

    const memoryBit = await MemoryBit.create({
      title,
      searchTitle: title.toLowerCase(),
      content,
      textColor,
      codeUsed,
      publicId
    });

    codeRecord.used = true;
    codeRecord.usedAt = new Date();
    codeRecord.publicId = publicId;
    await codeRecord.save();

    res.status(201).json({
      message: "Memory Bit creada",
      data: memoryBit
    });

  } catch (error) {
    console.error("ERROR createMemoryBit:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Obtener Memory Bit por publicId (PÚBLICA)
 */
exports.getMemoryBitByPublicId = async (req, res) => {
  try {
    const { publicId } = req.params;

    if (!/^[a-zA-Z0-9_-]{6,}$/.test(publicId)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const memoryBit = await MemoryBit.findOne({ publicId });

    if (!memoryBit) {
      return res.status(404).json({ message: "Memory Bit no encontrada" });
    }

    res.json(memoryBit);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Buscar Memory Bits (SOLO por título)
 */
exports.searchMemoryBits = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        message: "Falta el parámetro de búsqueda"
      });
    }

    const searchRegex = new RegExp(q, "i");

    const results = await MemoryBit.find({
      searchTitle: searchRegex
    }).sort({ createdAt: -1 });

    res.json(results);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * 🔐 Generar códigos (ADMIN)
 */
exports.generateCodes = async (req, res) => {
  try {
    const secret = req.headers["x-admin-secret"];

    if (!secret || secret !== process.env.ADMIN_SECRET) {
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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * 🔎 Validar código (PÚBLICO)
 */
exports.validateCode = async (req, res) => {
  try {
    const { code } = req.params;

    const codeRecord = await Code.findOne({ code });

    if (!codeRecord) {
      return res.status(400).json({ message: "Código inválido." });
    }

    if (codeRecord.used) {
      return res.status(400).json({ message: "Este código ya fue usado." });
    }

    res.json({ valid: true });

  } catch (error) {
    res.status(500).json({ message: "Error validando el código." });
  }
};