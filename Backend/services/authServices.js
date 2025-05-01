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

const login = async (data) => {
  let user = await utilisateur.findOne({ email: data.email });
  if (user == null) {
    throw new Error("Ce login n'existe pas");
  }
  const isMatch = await bcrypt.compare(data.mot_de_passe, user.mot_de_passe);
  if (isMatch == false) {
    throw new Error("Mot de passe erroné");
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

module.exports = { login, register };
