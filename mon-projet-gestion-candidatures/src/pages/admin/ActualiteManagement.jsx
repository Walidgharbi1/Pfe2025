import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../composants/SideBar";
import {
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiX,
  FiCalendar,
  FiFileText,
} from "react-icons/fi";
import {
  createActualite,
  handlefetchActualites,
  updateActualite,
} from "../../services/newsServices";
import { FaCheck } from "react-icons/fa";

export default function ActualiteManagement() {
  const navigate = useNavigate();
  const [actualites, setActualites] = useState([]);
  const [newActualite, setNewActualite] = useState({
    titre: "",
    description: "",
    contenu: "",
    dateExpiration: "",
  });
  const [editingActualite, setEditingActualite] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // Redirect if not admin
  const fetchActualites = async () => {
    try {
      const response = await handlefetchActualites();
      setActualites(response);
    } catch (error) {
      console.error("Erreur lors du chargement des actualités", error);
    }
  };
  // Fetch actualites
  useEffect(() => {
    fetchActualites();
  }, [token]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingActualite) {
        const response = await updateActualite(
          editingActualite._id,
          newActualite
        );
        fetchActualites();
        setIsFormOpen(false);
      } else {
        console.log(newActualite);
        const response = await createActualite({
          ...newActualite,
          status: "active",
        });
        setActualites([...actualites, response]);
        setIsFormOpen(false);
      }
      resetForm();
    } catch (error) {
      console.error("Erreur lors de l'opération", error);
    }
  };

  // Delete actualite
  const handleDelete = async (id, status) => {
    try {
      updateActualite(id, { status: status });
      fetchActualites();
    } catch (error) {
      console.error("Erreur lors de la suppression", error);
    }
  };

  // Edit actualite
  const handleEdit = (actualite) => {
    setEditingActualite(actualite);
    setNewActualite({
      titre: actualite.titre,
      description: actualite.description,
      contenu: actualite.contenu,
      dateExpiration: actualite.dateExpiration.split("T")[0],
    });
    setIsFormOpen(true);
  };

  // Reset form
  const resetForm = () => {
    setNewActualite({
      titre: "",
      description: "",
      contenu: "",
      dateExpiration: "",
    });
    setEditingActualite(null);
    setIsFormOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-6 lg:p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Gestion des Actualités
          </h1>
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <FiPlus className="mr-2" />
            Nouvelle Actualité
          </button>
        </div>

        {/* Form Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center border-b p-4">
                <h2 className="text-xl font-semibold">
                  {editingActualite
                    ? "Modifier Actualité"
                    : "Nouvelle Actualité"}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Titre
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={newActualite.titre}
                      onChange={(e) =>
                        setNewActualite({
                          ...newActualite,
                          titre: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={newActualite.description}
                      onChange={(e) =>
                        setNewActualite({
                          ...newActualite,
                          description: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contenu
                    </label>
                    <textarea
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={newActualite.contenu}
                      onChange={(e) =>
                        setNewActualite({
                          ...newActualite,
                          contenu: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date d'expiration
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiCalendar className="text-gray-400" />
                      </div>
                      <input
                        type="date"
                        className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        value={newActualite.dateExpiration}
                        onChange={(e) =>
                          setNewActualite({
                            ...newActualite,
                            dateExpiration: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    {editingActualite ? "Mettre à jour" : "Créer"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Actualités List */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
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
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Expire le
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {actualites.length > 0 ? (
                  actualites.map((actualite) => (
                    <tr key={actualite._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          {actualite.titre}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-500 line-clamp-2">
                          {actualite.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-500 flex items-center">
                          <FiCalendar className="mr-2 text-indigo-500" />
                          {new Date(
                            actualite.dateExpiration
                          ).toLocaleDateString("fr-FR")}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {actualite.status}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(actualite)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                          title="Modifier"
                        >
                          <FiEdit2 size={18} />
                        </button>
                        <button
                          onClick={() => {
                            if (actualite.status == "active") {
                              handleDelete(actualite._id, "inactive");
                            } else {
                              handleDelete(actualite._id, "active");
                            }
                          }}
                          className="text-red-600 hover:text-red-900"
                          title="Supprimer"
                        >
                          {actualite.status == "active" ? (
                            <FiTrash2 size={18} />
                          ) : (
                            <FaCheck color="green" />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      Aucune actualité disponible
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
