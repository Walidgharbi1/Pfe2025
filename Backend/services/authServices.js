const utilisateur = require("../models/Utilisateur.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function register(data) {
  try {
    const user = await utilisateur.findOne({ email: data.email });
    if (user) {
      throw new Error("email deja utilisé ! ");
    }
    const saltRounds = 10;
    const hashedMotDePasse = await bcrypt.hash(data.mot_de_passe, saltRounds);
    let newUser = new utilisateur({ ...data, mot_de_passe: hashedMotDePasse });
    await newUser.save();
    return newUser;
  } catch (err) {
    throw new Error(err);
  }
}

async function updateProfileService(data) {
  console.log("email", data.email);
  console.log("nouvelle mot de passe ", data.mot_de_passe);

  try {
    // Check if the new email is already used by another user
    if (data.email) {
      const existingEmail = await utilisateur.findOne({ email: data.email });
      if (existingEmail && existingEmail._id.toString() !== data._id) {
        throw new Error("Email déjà utilisé dans la plateforme !");
      }
    }

    // If password is being updated, hash it
    if (data.mot_de_passe && data.mot_de_passe.length > 0) {
      const saltRounds = 10;
      const hashedMotDePasse = await bcrypt.hash(data.mot_de_passe, saltRounds);
      data.mot_de_passe = hashedMotDePasse;
    } else {
      delete data.mot_de_passe; // Avoid overwriting the password with an empty string
    }

    const updatedUser = await utilisateur.findByIdAndUpdate(data._id, data, {
      new: true,
    });

    return updatedUser;
  } catch (err) {
    return {
      error: err.message || "Une erreur est survenue lors de la mise à jour.",
    };
  }
}

const login = async (data) => {
  let user = await utilisateur.findOne({ email: data.email });
  if (user == null) {
    throw new Error("Ce login n'existe pas");
  }
  const isMatch = await bcrypt.compare(data.mot_de_passe, user.mot_de_passe);
  if (isMatch == false) {
    throw new Error("Mot de passe erroné");
  }

  if (user.status == "inactive") {
    throw new Error("compte suspendu ! ");
  }

  let payload = {
    _id: user._id,
    login: user.login,
  };

  let token = jwt.sign(payload, "ter-515-420-AAA-utW-255-792", {
    expiresIn: "1h",
  });

  return { token: token, user: user, msg: "connecté avec succes!" };
};

const getAllUsers = async () => {
  let data = await utilisateur.find();
  return data;
};

module.exports = { getAllUsers, login, register, updateProfileService };
