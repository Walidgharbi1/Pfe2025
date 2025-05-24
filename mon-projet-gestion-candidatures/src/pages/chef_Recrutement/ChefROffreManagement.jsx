import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../composants/SideBar";
import { useSelector } from "react-redux";
import {
  ajouterOffre,
  deleteOffre,
  fetchOffres,
  toggleOffreStatus,
  updateOffre,
} from "../../services/OffreServices";
import OffreModal from "../../composants/OffreModal";
import { toast } from "react-toastify";
import {
  FiPlus,
  FiEdit,
  FiSearch,
  FiTrash2,
  FiToggleLeft,
  FiToggleRight,
  FiPhoneOff,
  FiPhoneCall,
} from "react-icons/fi";
import {
  FaRegMoneyBillAlt,
  FaBriefcase,
  FaGraduationCap,
} from "react-icons/fa";
import ChefRSidebar from "../../composants/ChefRSidebar";

export default function ChefROffreManagement() {
  const navigate = useNavigate();
  const [offres, setOffres] = useState([]);
  const [filteredOffres, setFilteredOffres] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [offerToEdit, setOfferToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchOffres().then((result) => {
      setOffres(result);
      setFilteredOffres(result);
    });
  }, [token]);

  useEffect(() => {
    const results = offres.filter(
      (offre) =>
        offre.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offre.specialite.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offre.salaire.toString().includes(searchTerm) ||
        offre.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOffres(results);
  }, [searchTerm, offres]);

  const handleCreateOffre = async (newOffre) => {
    try {
      const response = await ajouterOffre(newOffre);
      setOffres([...offres, response]);
      toast.success("Offre créée avec succès!");
    } catch (error) {
      console.error("Erreur lors de la création de l'offre", error);
      toast.error("Erreur lors de la création de l'offre");
    }
  };

  const handleUpdateOffre = async (updatedOffre) => {
    try {
      const response = await updateOffre(updatedOffre);
      setOffres(
        offres.map((offre) => (offre._id === response._id ? response : offre))
      );
      toast.success("Offre mise à jour avec succès!");
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'offre", error);
      toast.error("Erreur lors de la mise à jour de l'offre");
    }
  };

  const handleDeleteOffre = async (offreId) => {
    try {
      await deleteOffre(offreId);
      setOffres(offres.filter((offre) => offre._id !== offreId));
      toast.success("Offre supprimée avec succès!");
    } catch (error) {
      console.error("Erreur lors de la suppression de l'offre", error);
      toast.error("Erreur lors de la suppression de l'offre");
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

  const toggleStatus = async (id, status) => {
    try {
      const newStatus = status === "active" ? "inactive" : "active";
      await toggleOffreStatus(id, { status: newStatus });
      setOffres(
        offres.map((offre) =>
          offre._id === id ? { ...offre, status: newStatus } : offre
        )
      );
    } catch (error) {
      toast.error("Erreur lors du changement de statut");
    }
  };

  const getTypeIcon = (type) => {
    return type === "emploi" ? (
      <FaBriefcase className="text-blue-500" />
    ) : (
      <FaGraduationCap className="text-green-500" />
    );
  };

  const getStatusIcon = (status) => {
    return status === "active" ? (
      <FiPhoneCall className="text-green-500" />
    ) : (
      <FiPhoneOff className="text-red-500" />
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ChefRSidebar />

      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Gestion des Offres
          </h2>
          <button
            onClick={() => openModal()}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200"
          >
            <FiPlus className="mr-2" />
            Ajouter une offre
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher par titre, spécialité, salaire ou type..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Liste des offres
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full table-fixed">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Titre
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Spécialité
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Salaire
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOffres.length > 0 ? (
                  filteredOffres.map((offre) => (
                    <tr key={offre._id} className="hover:bg-gray-50">
                      <td
                        className="px-4 py-4 font-medium text-gray-900"
                        title={offre.titre}
                      >
                        {offre.titre}
                      </td>
                      <td
                        className="px-4 py-4 text-gray-500"
                        title={offre.specialite}
                      >
                        {offre.specialite}
                      </td>
                      <td className="px-4 py-4 text-gray-500 ">
                        <FaRegMoneyBillAlt className="mr-2 text-yellow-500" />
                        {offre.salaire} €
                      </td>
                      <td className="px-4 py-4 text-gray-500 flex items-center">
                        {getTypeIcon(offre.type)}
                        <span className="ml-2">
                          {offre.type === "emploi" ? "Emploi" : "Stage"}
                        </span>
                      </td>

                      <td>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={offre.status === "active"}
                            onChange={() =>
                              toggleStatus(offre._id, offre.status)
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-red-500 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                        </label>
                      </td>
                      <td>
                        <button
                          onClick={() => openModal(offre)}
                          className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 p-2 rounded transition duration-200"
                          title="Modifier"
                        >
                          <FiEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteOffre(offre._id)}
                          className="text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 p-2 rounded transition duration-200"
                          title="Supprimer"
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      Aucune offre trouvée
                    </td>
                  </tr>
                )}
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
    </div>
  );
}
