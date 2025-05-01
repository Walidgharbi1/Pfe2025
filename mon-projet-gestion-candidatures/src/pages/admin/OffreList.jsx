import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BarreNavigation from "../../composants/BarreNavigation";
import Footer from "../../composants/Footer";
import { fetchOffres } from "../../services/OffreServices";
import { toast } from "react-toastify";
import LoginModal from "../../composants/LoginModal";
import { useSelector } from "react-redux";
import CandidatureModal from "../../composants/CandidatureModel";

export default function OffreList() {
  const navigate = useNavigate();
  const [offres, setOffres] = useState([]);

  const token = localStorage.getItem("token");

  // Vérifier si l'utilisateur est connecté et récupérer ses informations
  const { user } = useSelector((state) => state.auth);

  // Charger toutes les offres
  useEffect(() => {
    const handleFetchOffres = async () => {
      try {
        const response = await fetchOffres();
        setOffres(response);
      } catch (error) {
        console.error("Erreur lors du chargement des offres", error);
      }
    };
    handleFetchOffres();
  }, []);

  // Gérer le clic sur le bouton "Postuler"
  const handlePostuler = (offreId) => {
    if (!user) {
      setIsOpen(true);
    } else if (user.role !== "candidat") {
      // Si l'utilisateur n'est pas un candidat, afficher une alerte
      toast.warn("Seuls les candidats peuvent postuler à cette offre.");
    } else {
      setCandModalIsOpen(true);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [candModalisOpen, setCandModalIsOpen] = useState(false);

  return (
    <>
      <CandidatureModal
        isOpen={candModalisOpen}
        onClose={() => setCandModalIsOpen(!candModalisOpen)}
      />
      <LoginModal isOpen={isOpen} onClose={() => setIsOpen(!isOpen)} />
      <div className="min-h-screen bg-gray-100 p-6">
        <h2 className="text-2xl font-bold mb-4">Liste des Offres</h2>

        {/* Liste des offres */}
        <div className="bg-white p-6 rounded shadow-md">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Titre</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Spécialité</th>
                <th className="px-4 py-2">Salaire</th>
                <th className="px-4 py-2">Date d'expiration</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {offres.map((offre) => (
                <tr key={offre._id}>
                  <td className="px-4 py-2">{offre.titre}</td>
                  <td className="px-4 py-2">{offre.description}</td>
                  <td className="px-4 py-2">{offre.specialite}</td>
                  <td className="px-4 py-2">{offre.salaire} TND</td>
                  <td className="px-4 py-2">
                    {new Date(offre.dateExpiration).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handlePostuler(offre._id)}
                      className="bg-blue-600 text-white py-1 px-3 rounded"
                    >
                      Postuler
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
