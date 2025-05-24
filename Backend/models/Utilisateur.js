const mongoose = require("mongoose");

const utilisateurSchema = new mongoose.Schema({
  nom: {
    type: String,
    require: true,
  },

  email: {
    type: String,
    require: true,
  },
  mot_de_passe: {
    type: String,
    require: true,
  },
  cin: {
    type: Number,
  },
  telephone: {
    type: Number,
  },
  adresse: {
    type: String,
  },
  role: {
    type: String,
    default: "candidat",
    enum: ["admin", "chefR", "candidat"],
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
});

let utilisateur = mongoose.model("utilisateur", utilisateurSchema);

module.exports = utilisateur;
