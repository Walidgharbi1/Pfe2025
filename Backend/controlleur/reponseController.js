const Reponse = require("../models/Reponse");

exports.addReponse = async (req, res) => {
  let newReponse = new Reponse(req.body);
  await newReponse.save();
  return res.status(201).json(newReponse);
};

exports.getReponseById = async (req, res) => {
  let reponse = await Reponse.findById(req.params.id);
  return res.status(200).json(reponse);
};

exports.verifyHasAnswered = async (req, res) => {
  let data = await Reponse.find({
    candidat_id: req.params.user_id,
    offre_id: req.params.offre_id,
  }).populate("id_test");

  return res.json(data);
};
