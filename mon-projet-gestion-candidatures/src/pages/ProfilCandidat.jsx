import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfilCandidat = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [adresse, setAdresse] = useState('');
  const [cin, setCin] = useState('');
  const [cv, setCv] = useState('');
  const [competences, setCompetences] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // État pour gérer l'édition du profil

  useEffect(() => {
    // Récupérer les données de l'utilisateur depuis localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setNom(parsedUser.nom);
      setEmail(parsedUser.email);
      setTelephone(parsedUser.telephone);
      setAdresse(parsedUser.adresse);
      setCin(parsedUser.cin);
      setCv(parsedUser.cv);
      setCompetences(parsedUser.competences || []);
    } else {
      navigate('/connexion'); // Rediriger vers la page de connexion si l'utilisateur n'est pas trouvé
    }
  }, [navigate]);

  const handleEdit = () => {
    setIsEditing(true); // Permet de passer en mode édition
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // Vérification du CIN de l'utilisateur
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData || !userData.cin) {
      alert("Le CIN de l'utilisateur est manquant.");
      return;
    }

    try {
      // Envoi des nouvelles données au backend via une requête PUT avec CIN dans l'URL
      const response = await axios.put(
        `http://localhost:3000/modifierCandidate/${userData.cin}`, // Utilisation de CIN dans l'URL
        { nom, email, telephone, adresse, cin, cv, competences }
      );

      // Mise à jour des données dans le localStorage après la modification
      localStorage.setItem('user', JSON.stringify(response.data));

      alert('Profil mis à jour avec succès');
      setIsEditing(false); // Désactiver le mode édition après la sauvegarde
      navigate('/CandidatDashboard/profil');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil', error);
      alert('Erreur lors de la mise à jour du profil');
    }
  };

  const handleCancel = () => {
    // Annuler la modification et revenir au profil
    navigate('/CandidatDashboard');
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Mon Profil</h3>

      {isEditing ? (
        // Formulaire pour modifier le profil
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Nom</label>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Téléphone</label>
            <input
              type="text"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Adresse</label>
            <input
              type="text"
              value={adresse}
              onChange={(e) => setAdresse(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">CIN</label>
            <input
              type="text"
              value={cin}
              onChange={(e) => setCin(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">CV (lien ou chemin)</label>
            <input
              type="text"
              value={cv}
              onChange={(e) => setCv(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Compétences</label>
            <input
              type="text"
              value={competences.join(', ')}
              onChange={(e) => setCompetences(e.target.value.split(','))}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Séparer les compétences par des virgules"
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Enregistrer les modifications
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="mt-4 bg-gray-600 text-white px-4 py-2 rounded"
            >
              Annuler
            </button>
          </div>
        </form>
      ) : (
        // Affichage des informations du profil
        <div>
          <p><strong>Nom:</strong> {nom}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Telephone:</strong> {telephone}</p>
          <p><strong>Adresse:</strong> {adresse}</p>
          <p><strong>CIN:</strong> {cin}</p>
          <p><strong>CV:</strong> {cv}</p>
          <p><strong>Compétences:</strong> {competences && competences.length > 0 ? competences.join(', ') : 'Aucune compétence'}</p>
          <button
            onClick={handleEdit}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Modifier mon profil
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilCandidat;
