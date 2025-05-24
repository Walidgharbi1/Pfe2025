const mongoose = require("mongoose");
const utilisateur = require("./Utilisateur");
const Offre = require("./Offre");
const candidatureSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: utilisateur,
  },
  cv_path: {
    type: String,
  },
  offre_id: {
    type: mongoose.Types.ObjectId,
    ref: Offre,
  },
  status: {
    type: String,
    default: "en_attente",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const candidature =
  mongoose.models.candidature ||
  mongoose.model("candidature", candidatureSchema);
module.exports = candidature;
