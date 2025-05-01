const cv = require("../models/Cv");

exports.getCandidatCv = async (req, res) => {
  try {
    let result = await cv.findOne({ user_id: req.params.id });
    return res.json(result);
  } catch (error) {
    console.log(err);
  }
};
