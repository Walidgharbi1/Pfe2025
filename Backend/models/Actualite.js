const mongoose = require("mongoose");

const actualiteSchema = new mongoose.Schema({
  titre: { type: String, required: true }, // Le titre de l'actualité
  description: { type: String, required: true }, // Une description courte de l'actualité
  contenu: { type: String, required: true }, // Le contenu détaillé de l'actualité
  datePublication: { type: Date, default: Date.now }, // La date de publication (par défaut la date actuelle)
  dateExpiration: { type: Date, required: true }, // Date d'expiration de l'actualité (si elle est périmée)
  status: {
    type: String,
  },
});

module.exports = mongoose.model("Actualite", actualiteSchema);
