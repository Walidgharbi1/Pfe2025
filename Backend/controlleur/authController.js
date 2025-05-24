const extractEducationInfo = require("../middlewares/extractAcademicInfos");
const extractExperienceFlexible = require("../middlewares/extractProfesionalInfos");
const extractSkills = require("../middlewares/extractSkills");
const cv = require("../models/cv");
const {
  login,
  register,
  updateProfileService,
  getAllUsers,
} = require("../services/authServices");
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

const updateProfileController = async (req, res) => {
  try {
    const userData = JSON.parse(req.body.userData);
    console.log(userData);
    const result = await updateProfileService(userData);
    if (!result) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    if (req.file) {
      const newCV = new cv({
        user_id: result._id,
        cv_path: req.file.path,
      });

      const pdfBuffer = fs.readFileSync(req.file.path);
      const data = await pdfParse(pdfBuffer);
      const text = data.text;

      newCV.skills = extractSkills(text);
      newCV.profInfos = extractExperienceFlexible(text);
      newCV.academicInfos = extractEducationInfo(text);

      await newCV.save();
    }

    if (result.error) {
      res.status(200).json({
        msg: result.error,
        error: result.error,
      });
    } else {
      res.status(200).json({
        msg: "Utilisateur mis à jour avec succès",
        user: result,
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

const getUsers = async (req, res) => {
  let data = await getAllUsers();
  res.json(data);
};

module.exports = {
  loginController,
  registerController,
  updateProfileController,
  getUsers,
};
