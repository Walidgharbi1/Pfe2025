const cv = require("../models/Cv");

exports.getCandidatCv = async (req, res) => {
  try {
    const result = await cv
      .findOne({
        user_id: req.params.id,
      })
      .sort({ createdAt: -1 });

    return res.json(result);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};
