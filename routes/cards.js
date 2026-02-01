const express = require("express");
const router = express.Router();
const Card = require("../models/Card");

// Crear una tarjeta (1 por código)
router.post("/", async (req, res) => {
  try {
    const { title, body, textColor, accessCode } = req.body;

    if (!title || !body || !accessCode) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    // Verificar si el código ya fue usado
    const existingCard = await Card.findOne({ accessCode });
    if (existingCard) {
      return res.status(403).json({ error: "Este código ya fue utilizado" });
    }

    // Crear ID público (para URL / QR)
    const publicId = Math.random().toString(36).substring(2, 10);

    const card = new Card({
      title,
      body,
      textColor,
      accessCode,
      publicId
    });

    await card.save();

    res.status(201).json({
      message: "Tarjeta creada",
      publicId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la tarjeta" });
  }
});

module.exports = router;