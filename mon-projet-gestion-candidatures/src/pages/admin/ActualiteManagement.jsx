import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../composants/SideBar';  // Import du Sidebar

export default function ActualiteManagement() {
  const navigate = useNavigate();
  const [actualites, setActualites] = useState([]);
  const [newActualite, setNewActualite] = useState({
    titre: '',
    description: '',
    contenu: '',
    dateExpiration: '',
  });

  const [editingActualite, setEditingActualite] = useState(null); // Gérer l'édition d'une actualité

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  if (!token || user.role !== 'admin') {
    navigate('/connexion');
  }

  // Charger toutes les actualités
  useEffect(() => {
    const fetchActualites = async () => {
      try {
        const response = await axios.get('http://localhost:3000/actualites', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setActualites(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des actualités', error);
      }
    };
    fetchActualites();
  }, [token]);

  // Créer une nouvelle actualité
  const handleCreateActualite = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/actualites', newActualite, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setActualites([...actualites, response.data]);
      setNewActualite({
        titre: '',
        description: '',
        contenu: '',
        dateExpiration: '',
      });
    } catch (error) {
      console.error('Erreur lors de la création de l\'actualité', error);
    }
  };

  // Supprimer une actualité
  const handleDeleteActualite = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/actualites/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setActualites(actualites.filter((actualite) => actualite._id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'actualité', error);
    }
  };

  // Consulter une actualité pour modification
  const handleEditActualite = (actualite) => {
    setEditingActualite(actualite);
    setNewActualite({
      titre: actualite.titre,
      description: actualite.description,
      contenu: actualite.contenu,
      dateExpiration: actualite.dateExpiration,
    });
  };

  // Modifier une actualité
  const handleUpdateActualite = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/actualites/${editingActualite._id}`,
        newActualite,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setActualites(actualites.map((actualite) => (actualite._id === response.data._id ? response.data : actualite)));
      setEditingActualite(null);
      setNewActualite({
        titre: '',
        description: '',
        contenu: '',
        dateExpiration: '',
      });
    } catch (error) {
      console.error('Erreur lors de la modification de l\'actualité', error);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar à gauche */}
      <Sidebar />

      {/* Contenu principal à droite */}
      <div className="flex-1 p-6 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">{editingActualite ? 'Modifier l\'actualité' : 'Créer une nouvelle actualité'}</h2>

        {/* Formulaire pour créer ou modifier une actualité */}
        <form onSubmit={editingActualite ? handleUpdateActualite : handleCreateActualite} className="bg-white p-6 rounded shadow-md mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Titre de l'actualité</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={newActualite.titre}
              onChange={(e) => setNewActualite({ ...newActualite, titre: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              value={newActualite.description}
              onChange={(e) => setNewActualite({ ...newActualite, description: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Contenu</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              value={newActualite.contenu}
              onChange={(e) => setNewActualite({ ...newActualite, contenu: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Date d'expiration</label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded"
              value={newActualite.dateExpiration}
              onChange={(e) => setNewActualite({ ...newActualite, dateExpiration: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 text-white py-2 rounded"
          >
            {editingActualite ? 'Mettre à jour l\'actualité' : 'Créer l\'actualité'}
          </button>
        </form>

        {/* Liste des actualités existantes */}
        <h3 className="text-xl font-semibold mb-4">Liste des actualités</h3>
        <div className="bg-white p-6 rounded shadow-md">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Titre</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {actualites.map((actualite) => (
                <tr key={actualite._id}>
                  <td className="px-4 py-2">{actualite.titre}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleEditActualite(actualite)}
                      className="bg-blue-600 text-white py-1 px-3 rounded"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDeleteActualite(actualite._id)}
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
    </div>
  );
}
