import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BarreNavigation from '../composants/BarreNavigation';
import Footer from '../composants/Footer';

export default function OffreList() {
  const navigate = useNavigate();
  const [offres, setOffres] = useState([]);
  const [user, setUser] = useState(null);

  const token = localStorage.getItem('token');

  // Vérifier si l'utilisateur est connecté et récupérer ses informations
  useEffect(() => {
    if (token) {
      const userData = JSON.parse(localStorage.getItem('user'));
      setUser(userData);
    }
  }, [token]);

  // Charger toutes les offres
  useEffect(() => {
    const fetchOffres = async () => {
      try {
        const response = await axios.get('http://localhost:3000/offres');
        setOffres(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des offres', error);
      }
    };
    fetchOffres();
  }, []);

  // Gérer le clic sur le bouton "Postuler"
  const handlePostuler = (offreId) => {
    if (!user) {
      // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
      navigate(`/connexion?redirect=offre/${offreId}`);
    } else if (user.role !== 'candidat') {
      // Si l'utilisateur n'est pas un candidat, afficher une alerte
      alert('Seuls les candidats peuvent postuler à cette offre.');
    } else {
      // Si l'utilisateur est un candidat, il peut postuler
      // Tu peux ajouter ici l'appel API pour postuler à l'offre
      alert(`Vous avez postulé à l'offre avec l'ID: ${offreId}`);
    }
  };

  return (
    <>
   
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
                  <td className="px-4 py-2">{new Date(offre.dateExpiration).toLocaleDateString()}</td>
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
