const mongoose = require("mongoose");

const CodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  used: {
    type: Boolean,
    default: false
  },
  cardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Card",
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  usedAt: {
    type: Date,
    default: null
  }
});

module.exports = mongoose.model("Code", CodeSchema);