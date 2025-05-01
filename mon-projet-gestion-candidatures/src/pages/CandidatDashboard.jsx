import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import SidebarCandidat from "../composants/SideBarCandidat";
import Footer from "../composants/Footer";
import ProfilCandidat from "./ProfilCandidat"; // Import de la page Profil
import StatistiquesCandidat from "./StatistiquesCandidat"; // Import de la page Statistiques

export default function CandidatDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [offres, setOffres] = useState([]);
  const [candidatures, setCandidatures] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté et récupérer les informations
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate("/connexion"); // Redirige vers la page de connexion si aucun utilisateur n'est trouvé
    }
  }, [navigate]);

  useEffect(() => {
    if (user) {
      // Charger les offres disponibles
      const fetchOffres = async () => {
        try {
          const response = await axios.get("http://localhost:3000/offres");
          setOffres(response.data);
        } catch (error) {
          console.error("Erreur lors du chargement des offres", error);
        }
      };

      // Charger les candidatures du candidat
      const fetchCandidatures = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/candidatures/${user._id}`
          );
          setCandidatures(response.data);
        } catch (error) {
          console.error("Erreur lors du chargement des candidatures", error);
        }
      };

      fetchOffres();
      fetchCandidatures();
    }
  }, [user]);

  // Gérer la candidature d'une offre
  const handlePostuler = async (offreId) => {
    try {
      await axios.post(`http://localhost:3000/candidatures`, {
        candidatId: user._id,
        offreId,
      });
      alert("Vous avez postulé à cette offre");
    } catch (error) {
      console.error("Erreur lors de la candidature", error);
    }
  };

  return (
    <>
      <div className="flex min-h-screen">
        {/* Sidebar à gauche */}
        <SidebarCandidat />

        {/* Contenu principal à droite */}
        <div className="flex-1 p-6 bg-gray-100">
          <h2 className="text-2xl font-bold mb-4">
            Bienvenue, {user ? user.nom : "Candidat"}
          </h2>

          {/* Routes dynamiques */}
          <Routes>
            <Route path="profil" element={<ProfilCandidat user={user} />} />

            <Route path="statistiques" element={<StatistiquesCandidat />} />
          </Routes>
        </div>
      </div>

      <Footer />
    </>
  );
}
