import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../composants/SideBar';  // Import du Sidebar

export default function OffreManagement() {
  const navigate = useNavigate();
  const [offres, setOffres] = useState([]);
  const [newOffre, setNewOffre] = useState({
    titre: '',
    description: '',
    dateExpiration: '',
    specialite: '',
    salaire: '',
    type: 'emploi', // Type par défaut : "emploi"
  });

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  if (!token || user.role !== 'admin') {
    navigate('/connexion');
  }

  // Charger toutes les offres
  useEffect(() => {
    const fetchOffres = async () => {
      try {
        const response = await axios.get('http://localhost:3000/offres', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOffres(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des offres', error);
      }
    };
    fetchOffres();
  }, [token]);

  // Créer une nouvelle offre
  const handleCreateOffre = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/offres/', newOffre, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOffres([...offres, response.data]);
      setNewOffre({
        titre: '',
        description: '',
        dateExpiration: '',
        specialite: '',
        salaire: '',
        type: 'emploi', // Réinitialiser le type à "emploi"
      });
    } catch (error) {
      console.error('Erreur lors de la création de l\'offre', error);
    }
  };

  // Supprimer une offre
  const handleDeleteOffre = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/offres/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOffres(offres.filter((offre) => offre._id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'offre', error);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar à gauche */}
      <Sidebar />

      {/* Contenu principal à droite */}
      <div className="flex-1 p-6 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Gestion des Offres</h2>

        {/* Formulaire pour ajouter une nouvelle offre */}
        <form onSubmit={handleCreateOffre} className="bg-white p-6 rounded shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-4">Créer une nouvelle offre</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Titre de l'offre</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={newOffre.titre}
              onChange={(e) => setNewOffre({ ...newOffre, titre: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              value={newOffre.description}
              onChange={(e) => setNewOffre({ ...newOffre, description: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Date d'expiration</label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded"
              value={newOffre.dateExpiration}
              onChange={(e) => setNewOffre({ ...newOffre, dateExpiration: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Spécialité</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={newOffre.specialite}
              onChange={(e) => setNewOffre({ ...newOffre, specialite: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Salaire proposé</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded"
              value={newOffre.salaire}
              onChange={(e) => setNewOffre({ ...newOffre, salaire: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Type d'offre</label>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={newOffre.type}
              onChange={(e) => setNewOffre({ ...newOffre, type: e.target.value })}
            >
              <option value="emploi">Emploi</option>
              <option value="stage">Stage</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Ajouter l'offre
          </button>
        </form>

        {/* Liste des offres existantes */}
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
                  <td className="px-4 py-2">{offre.type === 'emploi' ? 'Emploi' : 'Stage'}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDeleteOffre(offre._id)}
                      className="bg-red-600 text-white py-1 px-3 rounded"
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
