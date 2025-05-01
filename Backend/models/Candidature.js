const mongoose = require("mongoose");
const utilisateur = require("./Utilisateur");

const candidatureSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: utilisateur,
  },
  cv_path: {
    type: String,
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
