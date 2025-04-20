import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../composants/SideBar';

const ListeCandidats = () => {
  const [candidats, setCandidats] = useState([]);
  const [searchNom, setSearchNom] = useState('');
  const [editCandidat, setEditCandidat] = useState(null);

  const fetchCandidats = async () => {
    try {
      const res = await axios.get('http://localhost:3000/getAllCandidat');
      setCandidats(res.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des candidats', error);
    }
  };
  

  const chercherCandidat = async () => {
    if (searchNom.trim() === '') return fetchCandidats();

    try {
      const res = await axios.get(`http://localhost:3000/chercherParNom/${searchNom}`);
      setCandidats(res.data);
    } catch (err) {
      setCandidats([]);
      console.error('Candidat non trouvé');
    }
  };

  const supprimerCandidat = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/supprimerCandidate/${id}`);
      fetchCandidats();
    } catch (err) {
      console.error('Erreur lors de la suppression', err);
    }
  };

  const modifierCandidat = async () => {
    try {
      await axios.put(`http://localhost:3000/modifierCandidate/${editCandidat._id}`, editCandidat);
      setEditCandidat(null);
      fetchCandidats();
    } catch (err) {
      console.error('Erreur lors de la modification', err);
    }
  };

  useEffect(() => {
    fetchCandidats();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-xl font-bold mb-4">Liste des Candidats</h1>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Chercher par nom"
            value={searchNom}
            onChange={(e) => setSearchNom(e.target.value)}
            className="border rounded px-3 py-1"
          />
          <button onClick={chercherCandidat} className="ml-2 bg-blue-500 text-white px-4 py-1 rounded">
            Chercher
          </button>
        </div>

        <table className="w-full border">
  <thead>
    <tr className="bg-gray-200">
      <th className="p-2">Nom</th>
      <th className="p-2">CIN</th>
      <th className="p-2">Email</th>
      <th className="p-2">Expériences</th>
      <th className="p-2">Actions</th>
    </tr>
  </thead>
  <tbody>
    {candidats.map((c) => (
      <tr key={c._id} className="text-center border-t">
        <td className="p-2">
          {editCandidat?._id === c._id ? (
            <input
              value={editCandidat.nom}
              onChange={(e) => setEditCandidat({ ...editCandidat, nom: e.target.value })}
            />
          ) : (
            c.nom
          )}
        </td>
        <td className="p-2">{c.cin}</td>
        <td className="p-2">
          {editCandidat?._id === c._id ? (
            <input
              value={editCandidat.email}
              onChange={(e) => setEditCandidat({ ...editCandidat, email: e.target.value })}
            />
          ) : (
            c.email
          )}
        </td>
        <td className="p-2 text-left">
          {c.experiences?.length > 0 ? (
            <ul className="list-disc pl-4 text-sm">
              {c.experiences.map((exp, index) => (
                <li key={index}>
                  <span className="font-semibold">
                    {exp.type === 'académique' ? '📘' : '💼'} {exp.intitule}
                  </span>{' '}
                  — {exp.etablissement}, {exp.date_debut?.split('T')[0]} → {exp.date_fin?.split('T')[0]}
                </li>
              ))}
            </ul>
          ) : (
            <span className="text-gray-400 italic">Aucune</span>
          )}
        </td>
        <td className="p-2">
          {editCandidat?._id === c._id ? (
            <>
              <button onClick={modifierCandidat} className="text-green-600 mr-2">✔️</button>
              <button onClick={() => setEditCandidat(null)} className="text-red-600">✖️</button>
            </>
          ) : (
            <>
              <button onClick={() => setEditCandidat(c)} className="text-blue-600 mr-2">✏️</button>
              <button onClick={() => supprimerCandidat(c._id)} className="text-red-600">🗑️</button>
            </>
          )}
        </td>
      </tr>
    ))}
  </tbody>
</table>

      </div>
    </div>
  );
};

export default ListeCandidats;
