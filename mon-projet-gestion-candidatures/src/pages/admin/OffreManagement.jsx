import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../composants/SideBar";
import { useSelector } from "react-redux";
import {
  ajouterOffre,
  deleteOffre,
  fetchOffres,
  updateOffre,
} from "../../services/OffreServices";
import OffreModal from "../../composants/OffreModal";

export default function OffreManagement() {
  const navigate = useNavigate();
  const [offres, setOffres] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [offerToEdit, setOfferToEdit] = useState(null); // Track the offer being edited

  const { user, token } = useSelector((state) => state.auth);
  if (user.role !== "admin") {
    navigate("/connexion");
  }

  useEffect(() => {
    fetchOffres().then((result) => {
      setOffres(result);
    });
  }, [token]);

  const handleCreateOffre = async (newOffre) => {
    try {
      const response = await ajouterOffre(newOffre);
      setOffres([...offres, response]);
    } catch (error) {
      console.error("Erreur lors de la création de l'offre", error);
    }
  };

  const handleUpdateOffre = async (updatedOffre) => {
    try {
      const response = await updateOffre(updatedOffre);
      setOffres(
        offres.map((offre) => (offre._id === response._id ? response : offre))
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'offre", error);
    }
  };

  const handleDeleteOffre = (offreId) => {
    try {
      deleteOffre(offreId);
      setOffres(offres.filter((offre) => offre._id !== offreId));
    } catch (error) {
      console.error("Erreur lors de la suppression de l'offre", error);
    }
  };

  const openModal = (offer = null) => {
    setOfferToEdit(offer);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setOfferToEdit(null);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Gestion des Offres</h2>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white py-2 px-4 rounded mb-4"
        >
          Ajouter une offre
        </button>

        <h3 className="text-xl font-semibold mb-4">Liste des offres</h3>
        <div className="bg-white p-6 rounded shadow-md">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Titre</th>
                <th className="px-4 py-2">Spécialité</th>
                <th className="px-4 py-2">Salaire</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {offres.map((offre) => (
                <tr key={offre._id}>
                  <td className="px-4 py-2">{offre.titre}</td>
                  <td className="px-4 py-2">{offre.specialite}</td>
                  <td className="px-4 py-2">{offre.salaire} €</td>
                  <td className="px-4 py-2">
                    {offre.type === "emploi" ? "Emploi" : "Stage"}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => openModal(offre)}
                      className="bg-yellow-500 text-white py-1 px-3 rounded"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDeleteOffre(offre._id)}
                      className="bg-red-600 text-white py-1 px-3 rounded ml-2"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Adding/Editing Offer */}
      <OffreModal
        isOpen={isModalOpen}
        onClose={closeModal}
        offerToEdit={offerToEdit}
        onSave={offerToEdit ? handleUpdateOffre : handleCreateOffre}
      />
    </div>
  );
}
