const cv = require("../models/cv");
const utilisateur = require("../models/Utilisateur");

exports.getAllCandidats = async (req, res) => {
  try {
    const candidats = await utilisateur.find({ role: "candidat" });

    const candidats_cvs = await Promise.all(
      candidats.map(async (element) => {
        const candidat_cv = await cv.findOne({ user_id: element._id });
        return {
          ...element.toObject(), // <-- important if 'element' is a Mongoose document
          cv: candidat_cv,
        };
      })
    );

    res.status(200).json(candidats_cvs);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des candidats" });
  }
};

exports.supprimerCandidate = async (req, res) => {
  try {
    await utilisateur.findOneAndDelete({ _id: req.params.id });
    res.json({ msg: "candidat supprimé avec succes ! " });
  } catch (err) {
    res.json({ error: err });
  }
};

exports.updateCandidate = async (req, res) => {
  try {
    await utilisateur.findByIdAndUpdate(req.params.id, req.body);
    res.json({ msg: "status du compte modifié avec success! " });
  } catch (err) {
    res.json({ error: err });
  }
};
