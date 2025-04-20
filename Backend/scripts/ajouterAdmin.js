const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');

mongoose.connect('mongodb+srv://walid:walid@cluster0.p6zicxm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(async () => {
    const hashedPassword = await bcrypt.hash('admin123', 10); // mot de passe simple pour test

    const newAdmin = new Admin({
      nom: 'Super Admin',
      email: 'admin@test.com',
      motDePasse: hashedPassword
    });

    await newAdmin.save();
    console.log('✅ Admin ajouté avec succès !');
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error('❌ Erreur :', err);
  });
