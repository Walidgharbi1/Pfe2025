const extractEducationInfo = require("../middlewares/extractAcademicInfos");
const extractExperienceFlexible = require("../middlewares/extractProfesionalInfos");
const extractSkills = require("../middlewares/extractSkills");
const cv = require("../models/cv");
const { login, register } = require("../services/authServices");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const registerController = async (req, res) => {
  try {
    let result = await register(req.body);
    if (result) {
      let newCV = new cv({
        user_id: result._id,
        cv_path: req.file ? req.file.path : null,
      });
      const pdfBuffer = fs.readFileSync(req.file.path);
      const data = await pdfParse(pdfBuffer);
      const text = data.text;
      const skills = extractSkills(text);
      const profInfos = extractExperienceFlexible(text);
      const academicInfos = extractEducationInfo(text);
      newCV.skills = skills;
      newCV.profInfos = profInfos;
      newCV.academicInfos = academicInfos;
      await newCV.save();
    }
    res
      .status(201)
      .json({ msg: "utilisateur ajouté avec succes", user: result });
  } catch (err) {
    console.log(err.message);
    res.json({ error: err.message });
  }
};

const loginController = async (req, res) => {
  try {
    let result = await login(req.body);

    res.json(result);
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = { loginController, registerController };
