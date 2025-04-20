const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
router.get('/', (req, res) => {
  res.send('Bienvenue dans l’API de gestion des candidatures !');
});

app.use('/', router);
const candidatRoute = require('./routes/candidatRoute');
app.use('/', candidatRoute);
const experienceRoute = require('./routes/ExperienceRoute');
app.use('/api/experiences', experienceRoute);
const competenceRoute = require('./routes/CompetenceRoute');
app.use('/api/competences', competenceRoute);
const adminRoutes = require('./routes/adminRoute');
app.use('/', adminRoutes);
const chefRecrutementRoute = require('./routes/ChefRecrutementRoute');
app.use('/', chefRecrutementRoute);
const offreRoute = require('./routes/offreRoute');
app.use('/offres', offreRoute);
const testRoute = require('./routes/testRoute'); // Import de la route des tests
app.use('/tests', testRoute);
const actualiteRoute = require('./routes/actualiteRoute');
app.use('/actualites', actualiteRoute);
// Connexion à MongoDB
mongoose.connect('mongodb+srv://walid:walid@cluster0.p6zicxm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('✅ Connecté à MongoDB');
    // Lancer le serveur SEULEMENT après que MongoDB soit connecté
    app.listen(3000, () => console.log("🚀 Serveur en marche sur http://localhost:3000"));
  })
  .catch((err) => {
    console.error('❌ Erreur de connexion MongoDB :', err);
  });
