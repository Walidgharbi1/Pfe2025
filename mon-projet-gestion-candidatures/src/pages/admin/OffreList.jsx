import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchOffres } from "../../services/OffreServices";
import { toast } from "react-toastify";
import LoginModal from "../../composants/LoginModal";
import { useSelector } from "react-redux";
import CandidatureModal from "../../composants/CandidatureModel";
import { getCandidaturesByCandidatId } from "../../services/CandidatureServices";
import Sidebar from "../../composants/SideBar";
import SidebarCandidat from "../../composants/SideBarCandidat";
import {
  FaBriefcase,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaCheckCircle,
  FaPaperPlane,
  FaTimes,
} from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

export default function OffreList() {
  const navigate = useNavigate();
  const [offres, setOffres] = useState([]);
  const [userCandidatures, setUserCandidatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSpecialite, setFilterSpecialite] = useState("");
  const { user } = useSelector((state) => state.auth);

  const handleGetUserCandidatures = async () => {
    if (user && user._id) {
      const result = await getCandidaturesByCandidatId(user._id);
      setUserCandidatures(result.map((el) => el.offre_id._id));
    }
  };

  useEffect(() => {
    const handleFetchOffres = async () => {
      try {
        setLoading(true);
        const response = await fetchOffres();
        setOffres(response);
      } catch (error) {
        console.error("Erreur lors du chargement des offres", error);
        toast.error("Erreur lors du chargement des offres");
      } finally {
        setLoading(false);
      }
    };

    handleFetchOffres();
    handleGetUserCandidatures();
  }, [user]);

  const handlePostuler = (offreId) => {
    setActiveOffre(offreId);
    if (!user) {
      setIsOpen(true);
    } else if (user.role !== "candidat") {
      toast.warn("Seuls les candidats peuvent postuler à cette offre.");
    } else {
      setCandModalIsOpen(true);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [candModalisOpen, setCandModalIsOpen] = useState(false);
  const [activeOffre, setActiveOffre] = useState(null);

  // Filter offers based on search term and speciality
  const filteredOffres = offres.filter((offre) => {
    const matchesSearch =
      offre.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offre.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialite = filterSpecialite
      ? offre.specialite === filterSpecialite
      : true;
    return matchesSearch && matchesSpecialite;
  });

  // Get unique specialities for filter dropdown
  const specialites = [...new Set(offres.map((offre) => offre.specialite))];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {user && user.role === "admin" && <Sidebar />}
      {user && user.role === "candidat" && <SidebarCandidat />}
      {user && user.role === "chef" && <Sidebar />}

      <div className="flex-1 p-6 md:p-8 relative">
        {/* Login Modal - positioned above the content */}
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="h-5 w-5" />
              </button>
              <LoginModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
            </div>
          </div>
        )}

        {user && (
          <CandidatureModal
            isOpen={candModalisOpen}
            onClose={() => {
              setCandModalIsOpen(false);
              handleGetUserCandidatures();
            }}
            offre_id={activeOffre}
          />
        )}
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Offres d'emploi
              </h1>
              <p className="text-gray-600 mt-2">
                {
                  offres.filter(
                    (offre) => new Date(offre.dateExpiration) > new Date()
                  ).length
                }{" "}
                {offres.filter(
                  (offre) => new Date(offre.dateExpiration) > new Date()
                ).length === 1
                  ? "offre disponible"
                  : "offres disponibles"}
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto mt-4 md:mt-0">
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Rechercher des offres..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              <select
                className="w-full md:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filterSpecialite}
                onChange={(e) => setFilterSpecialite(e.target.value)}
              >
                <option value="">Toutes spécialités</option>
                {specialites.map((specialite) => (
                  <option key={specialite} value={specialite}>
                    {specialite}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredOffres.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                Aucune offre trouvée
              </h3>
              <p className="mt-1 text-gray-500">
                Essayez d'ajuster votre recherche ou vos filtres.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Titre
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Spécialité
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Salaire
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Expiration
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOffres.map((offre) => (
                    <tr key={offre._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <FaBriefcase className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {offre.titre}
                            </div>
                            <div className="text-sm text-gray-500 line-clamp-2">
                              {offre.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {offre.specialite}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <FaMoneyBillWave className="mr-2 text-green-500" />
                          {offre.salaire} TND
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <FaCalendarAlt className="mr-2 text-yellow-500" />
                          {new Date(offre.dateExpiration).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {userCandidatures.includes(offre._id) ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <FaCheckCircle className="mr-1" /> Déjà Postulé
                          </span>
                        ) : new Date(offre.dateExpiration) < new Date() ? (
                          <button
                            disabled
                            className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-700 cursor-not-allowed"
                          >
                            <FaPaperPlane className="mr-1" /> Offre expirée
                          </button>
                        ) : (
                          <button
                            onClick={() => handlePostuler(offre._id)}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <FaPaperPlane className="mr-1" /> Postuler
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
