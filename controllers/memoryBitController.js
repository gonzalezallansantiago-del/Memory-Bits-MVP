const MemoryBit = require("../models/MemoryBit");

// Crear tarjeta (SEGURA con contraseña)
exports.createMemoryBit = async (req, res) => {
  try {
    // 🔐 Seguridad mínima
    const secret = req.headers["x-admin-secret"];

    if (!secret || secret !== process.env.ADMIN_SECRET) {
      return res.status(401).json({
        message: "No autorizado"
      });
    }

    const {
      title,
      content,
      textColor,
      codeUsed,
      publicId
    } = req.body;

    // Validación mínima
    if (!title || !content || !codeUsed || !publicId) {
      return res.status(400).json({
        message: "Faltan campos obligatorios"
      });
    }

    const memoryBit = await MemoryBit.create({
      title,
      searchTitle: title.toLowerCase(),
      content,
      textColor,
      codeUsed,
      publicId
    });

    res.status(201).json({
      message: "Memory Bit creada",
      data: memoryBit
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener tarjeta por publicId (pública)
exports.getMemoryBitByPublicId = async (req, res) => {
  try {
    const { publicId } = req.params;

    // Validar formato del publicId
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

// Buscar Memory Bits
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
      $or: [
        { title: searchRegex },
        { searchTitle: searchRegex },
        { content: searchRegex }
      ]
    }).sort({ createdAt: -1 });

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};