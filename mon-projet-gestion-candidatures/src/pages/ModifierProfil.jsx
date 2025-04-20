import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ModifierProfil = () => {
  const navigate = useNavigate();
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [adresse, setAdresse] = useState('');
  const [cin, setCin] = useState('');
  const [cv, setCv] = useState('');
  const [isEditing, setIsEditing] = useState(false); // État pour gérer l'édition du profil
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleEdit = () => {
    setIsEditing(true); // Permet de passer en mode édition
    setNom(user.nom);
    setEmail(user.email);
    setTelephone(user.telephone);
    setAdresse(user.adresse);
    setCin(user.cin);
    setCv(user.cv);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      // Envoi des nouvelles données au backend via une requête PUT
      const response = await axios.put(
        `http://localhost:3000/candidats/${user._id}`,
        { nom, email, telephone, adresse, cin, cv },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Mise à jour des données dans le localStorage
      localStorage.setItem('user', JSON.stringify(response.data));

      alert('Profil mis à jour avec succès');
      setIsEditing(false); // Désactiver le mode édition après la sauvegarde
      navigate('/CandidatDashboard/profil');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil', error);
      alert('Erreur lors de la mise à jour du profil');
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Modifier Mon Profil</h3>

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
              type="number"
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
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Enregistrer les modifications
          </button>
        </form>
      ) : (
        // Affichage des informations du profil
        <div>
          <p><strong>Nom:</strong> {nom}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Téléphone:</strong> {telephone}</p>
          <p><strong>Adresse:</strong> {adresse}</p>
          <p><strong>CIN:</strong> {cin}</p>
          <p><strong>CV:</strong> {cv}</p>
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

export default ModifierProfil;
