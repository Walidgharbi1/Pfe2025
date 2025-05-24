const mongoose = require("mongoose");
const utilisateur = require("./Utilisateur");

const cvSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: utilisateur,
    },
    cv_path: {
      type: String,
    },

    skills: {
      type: [String],
    },
    profInfos: {
      type: Array,
    },
    academicInfos: {
      type: Array,
    },
  },
  { timestamps: true }
);

const cv = mongoose.models.cv || mongoose.model("cv", cvSchema);
module.exports = cv;
