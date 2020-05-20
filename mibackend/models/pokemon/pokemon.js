const mongoose = require("mongoose");

const { Schema } = mongoose;

const pokemonSchema = new Schema({
  nombre: { type: String, required: true },
  imagen: { type: String, required: true },
});

module.exports = mongoose.model("Pokemon", pokemonSchema);
