const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const utilisateur = require("../models/Utilisateur");

exports.checkAdmin = async () => {
  let exisitingUser = await utilisateur.findOne({ role: "admin" });
  if (!exisitingUser) {
    mongoose
      .connect("mongodb://localhost:27017/pfe_database")
      .then(async () => {
        const hashedPassword = await bcrypt.hash("admin", 10); // mot de passe simple pour test

        const newAdmin = new utilisateur({
          nom: "Super Admin",
          email: "admin@gmail.com",
          mot_de_passe: hashedPassword,
          role:"admin"
        });

        await newAdmin.save();
        console.log("✅ Admin ajouté avec succès !");
        mongoose.disconnect();
      })
      .catch((err) => {
        console.error("❌ Erreur :", err);
      });
  }
};
