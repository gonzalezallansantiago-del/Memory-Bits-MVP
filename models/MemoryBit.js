const mongoose = require("mongoose");

const MemoryBitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 120
  },

  searchTitle: {
    type: String,
    required: true,
    index: true
  },

  content: {
    type: String,
    required: true,
    maxlength: 1000
  },

  textColor: {
    type: String,
    enum: ["black", "blue", "green", "pink"],
    default: "black"
  },

codeUsed: {
  type: String,
  required: true
},

  publicId: {
    type: String,
    required: true,
    unique: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("MemoryBit", MemoryBitSchema);