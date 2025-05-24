const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRoutes");
const candidatsRouter = require("./routes/candidatRoute");
const offresRouter = require("./routes/offreRoute");
const candidatureRoutes = require("./routes/candidatureRoutes");
const testsRoutes = require("./routes/testRoute");
const reponseRoutes = require("./routes/reponseRoutes");
const CvRouter = require("./routes/CvRoutes");
const interviewRoutes = require("./routes/interviewRoutes.js");
const newsRoutes = require("./routes/actualiteRoute.js");
const app = express();
const path = require("path");
const { checkAdmin } = require("./scripts/ajouterAdmin");
const router = express.Router();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
router.get("/", (req, res) => {
  res.send("Bienvenue dans l’API de gestion des candidatures !");
});

app.use("/api/auth", authRouter);
app.use("/api/candidats", candidatsRouter);
app.use("/api/offres", offresRouter);
app.use("/api/cvs", CvRouter);

app.use("/api/candidatures", candidatureRoutes);
app.use("/api/tests", testsRoutes);
app.use("/api/reponses", reponseRoutes);
app.use("/api/interviews", interviewRoutes);

app.use("/api/actualites", newsRoutes);

//  localhost:3000/api/candidats/getAllCandidats
//localhost:3000/api/auth/login
// localhost:3000/login

// app.use('/', router);
// const candidatRoute = require('./routes/candidatRoute');
// app.use('/', candidatRoute);
// const experienceRoute = require('./routes/ExperienceRoute');
// app.use('/api/experiences', experienceRoute);
// const competenceRoute = require('./routes/CompetenceRoute');
// app.use('/api/competences', competenceRoute);
// const adminRoutes = require('./routes/adminRoute');
// app.use('/', adminRoutes);
// const chefRecrutementRoute = require('./routes/ChefRecrutementRoute');
// app.use('/', chefRecrutementRoute);
// const offreRoute = require('./routes/offreRoute');
// app.use('/offres', offreRoute);
// const testRoute = require('./routes/testRoute'); // Import de la route des tests
// app.use('/tests', testRoute);
// const actualiteRoute = require('./routes/actualiteRoute');
// app.use('/actualites', actualiteRoute);
// Connexion à MongoDB

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// localhost:3000/uploads/1745528003251-CV walid gharbi.pdf

checkAdmin();

mongoose
  .connect("mongodb://localhost:27017/pfe_database")
  .then(() => {
    console.log("✅ Connecté à MongoDB");
    // Lancer le serveur SEULEMENT après que MongoDB soit connecté
    app.listen(3000, () =>
      console.log("🚀 Serveur en marche sur http://localhost:3000")
    );
  })
  .catch((err) => {
    console.error("❌ Erreur de connexion MongoDB :", err);
  });
